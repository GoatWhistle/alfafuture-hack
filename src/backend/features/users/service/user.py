from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from features.users.models.user import User
from features.users.schemas.user import UserRegisterSchema
from utils.JWT import hash_password, create_access_token


async def get_user_by_email(session: AsyncSession, email: str) -> Optional[User]:
    stmt = select(User).where(User.email == email)
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


async def register_user_service(
        session: AsyncSession, user_data: UserRegisterSchema
) -> tuple[User, str]:
    existing_user = await get_user_by_email(session, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists",
        )

    hashed_password = hash_password(user_data.password)

    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    access_token = create_access_token(
        user_id=new_user.id,
        user_email=new_user.email,
    )

    return new_user, access_token
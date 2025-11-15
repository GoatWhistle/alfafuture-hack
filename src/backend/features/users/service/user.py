from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from features.users.models.user import User
from features.users.schemas.user import UserRegisterSchema, UserResponseSchema
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
        name=user_data.name,
        surname=user_data.surname,
        patronymic=user_data.patronymic,
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

    user_schema = UserResponseSchema.model_validate({
        "user_id": new_user.id,
        "email": new_user.email
    })

    return user_schema, access_token

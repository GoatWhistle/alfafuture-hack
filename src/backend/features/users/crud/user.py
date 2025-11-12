from features.users.models import User
from features.users.schemas import UserCreate, UserUpdate
from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from utils.JWT import hash_password


async def get_user_by_id(
    session: AsyncSession,
    user_id: int,
) -> User | None:
    return await session.get(User, user_id)


async def get_user_by_email(
    session: AsyncSession,
    email: EmailStr,
) -> User | None:
    result = await session.execute(select(User).filter_by(email=email))
    return result.scalars().first()


async def create_user(
    session: AsyncSession,
    user_data: UserCreate,
) -> User:
    user = User(
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )
    session.add(user)
    await session.flush()
    return user


async def update_user(
    session: AsyncSession,
    user: User,
    user_update: UserUpdate,
) -> User:
    update_data = user_update.model_dump(exclude_unset=True)

    if "email" in update_data:
        user.email = update_data["email"]

    if "password" in update_data:
        user.hashed_password = hash_password(update_data["password"])

    if "profile" in update_data and update_data["profile"]:
        for attr, value in update_data["profile"].items():
            setattr(user.profile, attr, value)

    await session.commit()
    await session.refresh(user)
    return user


async def delete_user(
    session: AsyncSession,
    user: User,
) -> None:
    await session.delete(user)
    await session.commit()

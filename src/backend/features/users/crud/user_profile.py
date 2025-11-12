from features.users.models import User, UserProfile
from features.users.schemas import UserProfileCreate, UserProfileUpdate
from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload


async def create_user_profile(
    session: AsyncSession,
    user_id: int,
    user_profile_create: UserProfileCreate,
) -> UserProfile:
    profile = UserProfile(
        **user_profile_create.model_dump(),
        user_id=user_id,
    )
    session.add(profile)
    await session.commit()
    await session.refresh(profile)
    return profile


async def get_user_profile_by_user_id(
    session: AsyncSession,
    user_id: int,
) -> UserProfile | None:
    return await session.get(UserProfile, user_id)


async def get_user_profile_by_email(
    session: AsyncSession,
    email: EmailStr,
) -> UserProfile | None:
    statement = (
        select(UserProfile)
        .join(User)
        .where(User.email == email)
        .options(joinedload(UserProfile.user))
    )
    result = await session.scalars(statement)
    return result.first()


async def update_user_profile(
    session: AsyncSession,
    profile: UserProfile,
    user_profile_update: UserProfileUpdate,
) -> UserProfile:
    update_data = user_profile_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(profile, field, value)

    await session.commit()
    await session.refresh(profile)
    return profile

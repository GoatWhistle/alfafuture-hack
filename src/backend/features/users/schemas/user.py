from features.users.schemas import UserProfileCreate, UserProfileRead, UserProfileUpdate
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr = Field(max_length=50)


class UserCreate(UserBase):
    password: str = Field(max_length=1000)
    profile: UserProfileCreate


class UserRead(UserBase):
    id: int
    profile: UserProfileRead

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    email: EmailStr | None = Field(default=None, max_length=50)
    password: str | None = Field(default=None, max_length=1000)
    profile: UserProfileUpdate | None = None

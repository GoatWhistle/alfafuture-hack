from pydantic import BaseModel, ConfigDict, Field


class UserProfileBase(BaseModel):
    name: str = Field(max_length=30)
    surname: str = Field(max_length=30)
    patronymic: str | None = Field(None, max_length=30)


class UserProfileCreate(UserProfileBase):
    pass


class UserProfileRead(UserProfileBase):
    user_id: int

    model_config = ConfigDict(from_attributes=True)


class UserProfileUpdate(UserProfileBase):
    name: str | None = Field(None, max_length=30)
    surname: str | None = Field(None, max_length=30)
    patronymic: str | None = Field(None, max_length=30)

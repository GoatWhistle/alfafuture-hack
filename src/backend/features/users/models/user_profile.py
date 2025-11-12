from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.base import Base
from features.users.schemas import UserProfileRead

if TYPE_CHECKING:
    from features.users.models import User


class UserProfile(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    name: Mapped[str] = mapped_column(String(length=30), index=True)
    surname: Mapped[str] = mapped_column(String(length=30), index=True)
    patronymic: Mapped[str] = mapped_column(String(length=30), index=True)

    user: Mapped["User"] = relationship(back_populates="profile")

    def get_validation_schema(self) -> UserProfileRead:
        return UserProfileRead.model_validate(self)

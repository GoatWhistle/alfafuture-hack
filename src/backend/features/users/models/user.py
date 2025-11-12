from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import IdIntPkMixin
from database.base import Base

if TYPE_CHECKING:
    from features.users.models import UserProfile


class User(Base, IdIntPkMixin):
    email: Mapped[str] = mapped_column(String(length=100), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(length=1000))

    profile: Mapped["UserProfile"] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )

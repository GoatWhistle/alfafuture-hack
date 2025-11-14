from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from database import IdIntPkMixin
from database.base import Base


class User(Base, IdIntPkMixin):
    name: Mapped[str] = mapped_column(String(length=30), index=True)
    surname: Mapped[str] = mapped_column(String(length=30), index=True)
    patronymic: Mapped[str] = mapped_column(String(length=30), index=True)

    email: Mapped[str] = mapped_column(String(length=100), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(length=1000))


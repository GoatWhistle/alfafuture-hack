from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from database import Base, IdIntPkMixin
from features.chat.schemas import ChatRead

if TYPE_CHECKING:
    from features.message.models import Message


class Chat(Base, IdIntPkMixin):
    title: Mapped[str] = mapped_column(String(100))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.timezone("UTC", func.now())
    )

    messages: Mapped[list["Message"]] = relationship(
        back_populates="chat", cascade="all, delete-orphan"
    )

    def get_validation_schema(self) -> ChatRead:
        return ChatRead.model_validate(self)

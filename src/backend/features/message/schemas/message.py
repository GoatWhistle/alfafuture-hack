from datetime import datetime

from pydantic import BaseModel, ConfigDict

from shared.enums import SenderEnum


class MessageBase(BaseModel):
    content: str


class MessageCreate(MessageBase):
    chat_id: int


class MessageRead(MessageBase):
    id: int
    chat_id: int
    sender: SenderEnum
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

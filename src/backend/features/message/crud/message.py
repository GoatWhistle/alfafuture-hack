from sqlalchemy.ext.asyncio import AsyncSession

from features.message.models import Message
from features.message.schemas import MessageCreate
from shared.enums import SenderEnum


async def create_message(
    session: AsyncSession,
    message_create: MessageCreate,
    sender: SenderEnum,
) -> Message:
    message = Message(
        **message_create.model_dump(),
        sender=sender,
    )
    session.add(message)
    await session.commit()
    await session.refresh(message)
    return message

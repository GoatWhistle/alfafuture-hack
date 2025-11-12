from sqlalchemy.ext.asyncio import AsyncSession

import features.chats.crud.chat as crud
from features.chats.schemas import ChatCreate, ChatRead, ChatUpdate
from features.chats.validators import get_chat_or_404


async def create_chat(
    session: AsyncSession,
    chat_create: ChatCreate,
) -> ChatRead:
    chat = await crud.create_chat(session, chat_create)
    return chat.get_validation_schema()


async def get_chat(
    session: AsyncSession,
    chat_id: int,
) -> ChatRead:
    chat = await get_chat_or_404(session, chat_id)
    return chat.get_validation_schema()


async def update_chat(
    session: AsyncSession,
    chat_id: int,
    chat_update: ChatUpdate,
) -> ChatRead:
    chat = await get_chat_or_404(session, chat_id)
    updated = await crud.update_chat(session, chat, chat_update)
    return updated.get_validation_schema()


async def delete_chat(
    session: AsyncSession,
    chat_id: int,
) -> None:
    chat = await get_chat_or_404(session, chat_id)
    await crud.delete_chat(session, chat)

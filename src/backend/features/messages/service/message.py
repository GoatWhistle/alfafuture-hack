from sqlalchemy.ext.asyncio import AsyncSession

import features.messages.crud.message as crud
import features.messages.mappers.message_builder as builder
from features.llm.client import LLMClient
from features.messages.schemas import MessageCreate, MessageRead
from shared.enums import SenderEnum


async def send_message(
    session: AsyncSession,
    message_create: MessageCreate,
) -> dict[str, MessageRead]:
    user_message = await crud.create_message(session, message_create, SenderEnum.USER)

    async with LLMClient() as llm_client:
        llm_response = await llm_client.ask(message_create.content)

    llm_message = await crud.create_message(
        session,
        MessageCreate(chat_id=message_create.chat_id, content=llm_response),
        SenderEnum.LLM,
    )
    builder.build_message_schema(user_message)
    return {
        "user_message": builder.build_message_schema(user_message),
        "llm_message": builder.build_message_schema(llm_message),
    }

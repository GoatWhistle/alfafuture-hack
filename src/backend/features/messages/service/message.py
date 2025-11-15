from sqlalchemy.ext.asyncio import AsyncSession

import features.messages.crud.message as crud
import features.messages.mappers.message_builder as builder
from features.llm.client import LLMClient
from features.llm.context_builder import build_dynamic_context
from features.messages.schemas import MessageCreate, MessageRead
from shared.enums import SenderEnum


async def send_message(
    session: AsyncSession,
    message_create: MessageCreate,
) -> dict[str, MessageRead]:
    user_message = await crud.create_message(session, message_create, SenderEnum.USER)

    all_messages = await crud.get_messages_for_window(session, message_create.chat_id)

    prompt = build_dynamic_context(all_messages) + f"\nUser: {message_create.content}"

    async with LLMClient() as llm:
        llm_response = await llm.ask(prompt)

    llm_message = await crud.create_message(
        session,
        MessageCreate(chat_id=message_create.chat_id, content=llm_response),
        SenderEnum.LLM,
    )

    return {
        "user_message": builder.build_message_schema(user_message),
        "llm_message": builder.build_message_schema(llm_message),
    }

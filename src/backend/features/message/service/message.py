from sqlalchemy.ext.asyncio import AsyncSession

import features.message.crud.message as crud
from features.message.schemas import MessageCreate, MessageRead
from shared.enums import SenderEnum


async def send_message(
    session: AsyncSession,
    message_create: MessageCreate,
) -> dict[str, MessageRead]:
    user_message = await crud.create_message(session, message_create, SenderEnum.USER)

    # TODO: (заглушка)
    llm_response = f"LLM answer on: {message_create.content}"

    llm_message = await crud.create_message(
        session,
        MessageCreate(chat_id=message_create.chat_id, content=llm_response),
        SenderEnum.LLM,
    )

    return {
        "user_message": user_message.get_validation_schema(),
        "llm_message": llm_message.get_validation_schema(),
    }

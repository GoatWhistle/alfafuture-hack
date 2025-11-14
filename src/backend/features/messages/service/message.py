from sqlalchemy.ext.asyncio import AsyncSession

import features.messages.crud.message as crud
from features.llm.client import LLMClient
from features.messages.schemas import MessageCreate, MessageRead
from shared.enums import SenderEnum

llm_client = LLMClient()


async def send_message(
    session: AsyncSession,
    message_create: MessageCreate,
) -> dict[str, MessageRead]:
    user_message = await crud.create_message(session, message_create, SenderEnum.USER)

    llm_response = await llm_client.ask(message_create.content)
    llm_message = await crud.create_message(
        session,
        MessageCreate(chat_id=message_create.chat_id, content=llm_response),
        SenderEnum.LLM,
    )

    return {
        "user_message": user_message.get_validation_schema(),
        "llm_message": llm_message.get_validation_schema(),
    }

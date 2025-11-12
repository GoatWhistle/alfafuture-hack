from fastapi import APIRouter

from core.config import settings
from features.chats.api.chat import router as chat_router
from features.messages.api.message import router as message_router

router = APIRouter(
    prefix=settings.api.v1.prefix,
)

router.include_router(
    router=chat_router,
    tags=[settings.api.chats[1:].capitalize()],
    prefix=settings.api.chats,
)

router.include_router(
    router=message_router,
    tags=[settings.api.messages[1:].capitalize()],
    prefix=settings.api.messages,
)

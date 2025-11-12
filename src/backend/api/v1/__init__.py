from fastapi import APIRouter

from core.config import settings
from features.chat.api.chat import router as chat_router
from features.message.api.message import router as message_router

router = APIRouter(
    prefix=settings.api.v1.prefix,
)

router.include_router(
    router=chat_router,
    tags=[settings.api.chat[1:].capitalize()],
    prefix=settings.api.chat,
)

router.include_router(
    router=message_router,
    tags=[settings.api.message[1:].capitalize()],
    prefix=settings.api.cmessagehat,
)

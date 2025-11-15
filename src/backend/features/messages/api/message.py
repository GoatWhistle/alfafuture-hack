from http import HTTPStatus

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import features.messages.service.message as service
from database import db_helper
from features.messages.schemas import MessageCreate, MessageRead
from features.users.models import User
from features.users.service.user import get_current_user_from_cookie

router = APIRouter()


@router.post(
    "/send",
    response_model=dict[str, MessageRead],
    status_code=HTTPStatus.CREATED,
)
async def send_user_message(
    message_create: MessageCreate,
    session: AsyncSession = Depends(db_helper.dependency_session_getter),
    user: User = Depends(get_current_user_from_cookie),
):
    data = await service.send_message(session, message_create, user.id)
    return data

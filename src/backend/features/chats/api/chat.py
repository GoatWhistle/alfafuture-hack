from http import HTTPStatus

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import features.chats.service.chat as service
from database import db_helper
from features.chats.schemas import ChatCreate, ChatRead, ChatUpdate

router = APIRouter()


@router.post(
    "/",
    response_model=ChatRead,
    status_code=HTTPStatus.CREATED,
)
async def create_chat(
    chat_create: ChatCreate,
    session: AsyncSession = Depends(db_helper.dependency_session_getter),
):
    data = await service.create_chat(session, chat_create)
    return data


@router.get(
    "/{chat_id}/",
    response_model=ChatRead,
    status_code=HTTPStatus.OK,
)
async def get_chat(
    chat_id: int,
    session: AsyncSession = Depends(db_helper.dependency_session_getter),
):
    data = await service.get_chat(session, chat_id)
    return data


@router.patch(
    "/{chat_id}/",
    response_model=ChatRead,
    status_code=HTTPStatus.OK,
)
async def update_chat(
    chat_id: int,
    chat_update: ChatUpdate,
    session: AsyncSession = Depends(db_helper.dependency_session_getter),
):
    data = await service.update_chat(session, chat_id, chat_update)
    return data


@router.delete(
    "/{chat_id}/",
    status_code=HTTPStatus.NO_CONTENT,
)
async def delete_chat(
    chat_id: int,
    session: AsyncSession = Depends(db_helper.dependency_session_getter),
):
    await service.delete_chat(session, chat_id)

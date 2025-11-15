from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from database.db_helper import db_helper
from features.users.schemas.user import UserRegisterSchema, UserResponseSchema
from features.users.service.user import register_user_service

router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
async def register(
        user_data: UserRegisterSchema,
        response: Response,
        session: AsyncSession = Depends(db_helper.dependency_session_getter),
):
    new_user, access_token = await register_user_service(session, user_data)

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
    )

    return new_user
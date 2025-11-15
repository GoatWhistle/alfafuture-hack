from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from database.db_helper import db_helper
from features.users.schemas.user import UserRegisterSchema, UserResponseSchema, UserLoginSchema
from features.users.service.user import register_user_service, login_user_service, get_current_user_from_cookie
from features.users.models.user import User

router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    user_data: UserRegisterSchema,
    session: AsyncSession = Depends(db_helper.dependency_session_getter),
):
    new_user = await register_user_service(session, user_data)

    return new_user


@router.post("/login", response_model=UserResponseSchema)
async def login_for_access_token(
    response: Response,
    login_data: UserLoginSchema,
    session: AsyncSession = Depends(db_helper.dependency_session_getter)
):
    user_schema, access_token = await login_user_service(session, login_data)

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="strict",
        secure=True,
        max_age=settings.jwt.access_token_lifetime_seconds
    )
    return user_schema


@router.get("/users/me", response_model=UserResponseSchema)
async def read_users_me(current_user: User = Depends(get_current_user_from_cookie)):
    return  UserResponseSchema(
        user_id=current_user.id,
        email=current_user.email,
    )
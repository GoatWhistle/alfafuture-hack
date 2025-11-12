from features.users.exceptions import UserNotFoundException
from features.users.schemas import UserRead


async def validate_activity_and_verification(user: UserRead):
    if not user:
        raise UserNotFoundException()

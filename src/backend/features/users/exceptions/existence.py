from shared.exceptions import NotFoundException


class UserNotFoundException(NotFoundException):
    detail = "User not found"


class UserProfileNotFoundException(NotFoundException):
    detail = "User profile not found"

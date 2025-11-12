from http import HTTPStatus

from shared.exceptions import RuleException


class AuthenticationRequiredException(RuleException):
    status_code: int = HTTPStatus.UNAUTHORIZED
    detail = "Authentication required"


class AuthenticatedActionForbiddenException(RuleException):
    detail = "Authenticated users cannot perform this action"

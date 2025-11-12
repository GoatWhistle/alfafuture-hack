from shared.exceptions import AppException


class TimingException(AppException):
    detail: str = "Timing validation error"


class RequestTimeoutException(TimingException):
    detail = "The request time has expired"

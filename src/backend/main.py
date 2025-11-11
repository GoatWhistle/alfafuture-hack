from http import HTTPStatus

import uvicorn
from fastapi import FastAPI

from api import router as api_router
from core.config import Settings, settings

app = FastAPI()
app.include_router(
    api_router,
)


@app.get(
    "/ping",
    status_code=HTTPStatus.OK,
)
async def ping():
    return {"message": "pong"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.run.host,
        port=settings.run.port,
        reload=True,
    )

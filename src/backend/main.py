from http import HTTPStatus

import uvicorn
from fastapi import FastAPI

from api import router as api_router

app = FastAPI()
app.include_router(
    api_router,
)


@app.get(
    "/health",
    status_code=HTTPStatus.OK,
)
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )

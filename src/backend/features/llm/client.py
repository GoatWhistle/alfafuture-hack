import asyncio

import httpx

from core.config import settings


class LLMClient:
    def __init__(self, model: str | None = None):
        self.api_key = settings.llm.api_key
        self.base_url = settings.llm.api_base
        self.model = model or settings.llm.default_model
        self.client: httpx.AsyncClient | None = None

    async def __aenter__(self):
        self.client = httpx.AsyncClient(
            base_url=self.base_url,
            headers={"Authorization": f"Bearer {self.api_key}"},
            timeout=20.0,
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.client:
            await self.client.aclose()

    async def ask(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 512,
        retries: int = 3,
    ) -> str:
        if not self.client:
            raise RuntimeError("LLMClient must be used within async with context")

        for attempt in range(retries):
            response = await self.client.post(
                "/chat/completions",
                json={
                    "model": self.model,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": temperature,
                    "max_tokens": max_tokens,
                },
            )

            try:
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]

            except httpx.HTTPStatusError as exc:
                if exc.response.status_code == 429 and attempt < retries - 1:
                    await asyncio.sleep(1.5**attempt)
                    continue
                raise

FROM python:3.13.0-bookworm

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PATH="/root/.local/bin:${PATH}"

WORKDIR /backend

RUN pip install --upgrade pip wheel "poetry==2.1.1"

RUN poetry config virtualenvs.create false

COPY backend/pyproject.toml backend/poetry.lock ./

RUN poetry install

COPY backend ./

RUN chmod +x main.py

CMD ["python3", "main.py"]

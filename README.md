# AlfaFuture Hack — Small Business Assistant

---
<div align="center">

[README на русском](i18n/README_ru.md)

</div>

<div align="center">

<a href="#project-description">Project Description</a> |
<a href="#tech-stack">Tech Stack</a> |
<a href="#local-setup">Local Setup</a> |
<a href="#team">About Team</a>

</div>

---

<h2 id="project-description">Project Description</h2>

This project is a **web application** that helps small business owners handle everyday tasks using **LLM (Language
Learning Models)**.

The application provides recommendations and automates routine operations in areas such as:

- Legal questions
- Finance and accounting
- Marketing and promotion
- Operational processes and personnel management

The goal is to **save the business owner's time** and improve the quality of daily decisions through contextual guidance
and proactive analytics.

---

<h2 id="tech-stack">Tech Stack</h2>

- Backend: **Python + FastAPI**
- Frontend: **React / Vite**
- Database: **PostgreSQL**
- Containerization: **Docker + Docker Compose**
- LLM: OpenRouter / OpenAI (model used: `openai/gpt-oss-20b:free`)

---

<h2 id="local-setup">Local Setup</h2>

### 1. Go to the backend folder

```bash
cd src/backend
```

### 2. Create environment files

- Create a .env file based on [`.env.example`](src/backend/.env.example)
- Create a .env.app_config file based on [`.env.app_config.example`](src/backend/.env.app_config.example)

### 3. Start Docker Desktop

### 4. Bring up the containers via Docker Compose

```bash
docker compose --env-file .env up -d --build
```

### 5. Check the services

- **Backend**: open http://localhost:8000/docs
- **Frontend**: open http://localhost:80

---

<h2 id="about-team">About Team</h2>

Our team consists of specialists combining development, design, and business analysis skills to create a small business
assistant application:

- **Mikhail Khorokhorin** — Backend development, LLM integration, database management
- **Artem Saveliev** — Backend development, registration and authorization
- **Robert Savitskas** — Frontend development, UI/UX
- **Timofey Pupykin** — Testing, Docker/CI/CD, ensuring stability and deployment

Together, we designed the application architecture, implemented the LLM assistant functionality, and provided a
user-friendly interface.

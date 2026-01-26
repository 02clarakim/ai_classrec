FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir tensorflow-cpu==2.20
COPY . .

EXPOSE 5000

CMD gunicorn server:app --bind 0.0.0.0:$PORT

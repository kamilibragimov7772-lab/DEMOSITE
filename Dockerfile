# Multi-stage Docker build для Astro static site.
# Stage 1 (builder) — собирает dist/ через npm run build.
# Stage 2 (runner)  — лёгкий образ с serve, отдаёт static-файлы.
#
# Образ оптимизирован под Railway / любой Docker-host (Fly.io, Render, etc).

# ─── Stage 1: BUILD ──────────────────────────────────────────────
FROM node:20-alpine AS builder

# vips-dev + build-essential нужны для нативной сборки `sharp` (image optimization в Astro).
RUN apk add --no-cache \
    vips-dev \
    pkgconf \
    python3 \
    make \
    g++

WORKDIR /app

# Сначала копируем только манифесты — для лучшего кеша слоёв.
COPY package.json package-lock.json ./
RUN npm ci

# Теперь весь исходник + сборка.
COPY . .
RUN npm run build

# ─── Stage 2: RUNTIME ────────────────────────────────────────────
FROM node:20-alpine AS runner

# vips нужен runtime если sharp используется на лету.
# Здесь у нас pure static — но оставляем на случай SSR.
RUN apk add --no-cache vips

WORKDIR /app

# Глобально ставим static-server `serve`.
RUN npm install -g serve@14

# Копируем только результат сборки — образ остаётся лёгким.
COPY --from=builder /app/dist ./dist

# Railway / любой Docker-host прокидывает PORT через env-var.
# Default 4321 для локального docker run.
ENV PORT=4321
EXPOSE 4321

CMD ["sh", "-c", "serve dist -l tcp://0.0.0.0:${PORT} --no-clipboard"]

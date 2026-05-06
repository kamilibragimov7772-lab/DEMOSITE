# Multi-stage Docker build для Astro static site.
# Stage 1 (builder) — собирает dist/ через npm run build.
# Stage 2 (runner)  — лёгкий образ с serve, отдаёт static-файлы.
#
# ВАЖНО: используем node:22-bookworm-slim (Debian glibc), а НЕ alpine (musl libc).
# Причина: sharp@0.34 не имеет prebuilt-binaries для musl, на alpine падает
# с "Attempting to build from source via node-gyp / Please add node-addon-api".
# На glibc Debian sharp ставится prebuilt мгновенно.

# ─── Stage 1: BUILD ──────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Сначала копируем только манифесты — для лучшего кеша слоёв.
COPY package.json package-lock.json ./

# --include=optional нужен для optional-binaries sharp.
RUN npm ci --include=optional

# Теперь весь исходник + сборка.
COPY . .
RUN npm run build

# ─── Stage 2: RUNTIME ────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner

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

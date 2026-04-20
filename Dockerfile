FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY server/ ./server/
COPY widget/ ./widget/

EXPOSE 3000

CMD ["node", "server/index.js"]

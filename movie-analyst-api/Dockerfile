FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs22-debian12 AS runtime

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY server.js ./

CMD ["server.js"]
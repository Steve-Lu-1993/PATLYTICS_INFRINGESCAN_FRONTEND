FROM node:20.13-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BACKEND_API_BASE_URL
ENV VITE_BACKEND_API_BASE_URL=${VITE_BACKEND_API_BASE_URL}

RUN npm run build

FROM node:20.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/dist /app

COPY bs-config.json /app

EXPOSE 5373

CMD ["npx", "lite-server", "-c", "bs-config.json"]

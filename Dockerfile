FROM raphauy/nextjs-base:latest AS build

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build

RUN rm .env

EXPOSE 3000

CMD ["pnpm", "start"]
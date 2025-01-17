# Этап 1: Сборка приложения
FROM node:22-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем весь проект
COPY . .

# Собираем TypeScript-код
RUN yarn run build

# Генерируем Prisma Client
RUN npx prisma generate

# Этап 2: Production-образ
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости для production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Копируем собранный код и необходимые файлы
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Указываем порт
EXPOSE 3000

# Указываем команду запуска
CMD ["yarn", "run", "start:migrate:prod"]

# Указываем базовый образ Node.js
FROM node:23-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Компилируем TypeScript в JavaScript
RUN npm run build

# Финальный образ
FROM node:23-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и сборку из предыдущего этапа
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/

# Копируем Prisma файлы
COPY prisma ./prisma

# Генерируем Prisma Client
RUN npx prisma generate

# Открываем порт приложения
EXPOSE 3000

# Выполняем миграции Prisma и запускаем приложение
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
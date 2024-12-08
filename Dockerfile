# Указываем базовый образ
FROM node:23 as builder

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем всё остальное и собираем проект
COPY . .
RUN npm run build

# Production stage
FROM node:23 as production

WORKDIR /usr/src/app

# Копируем только нужные файлы для production
COPY package*.json ./
RUN npm install —only=production
COPY —from=builder /usr/src/app/dist ./dist/

# Запуск приложения
RUN npx prisma migrate production
CMD ["npm", "run", "start:prod"]
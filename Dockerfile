# Указываем базовый образ Node.js
FROM node:23-alpine 

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
COPY yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем остальные файлы проекта
COPY . .

RUN yarn run build

# Генерируем Prisma Client
RUN npx prisma migrate deploy
RUN npx prisma generate
# RUN chmod +x /app/dist/main.js
# RUN ls -al /app/dist
# Открываем порт приложения
EXPOSE 3000

# Выполняем миграции Prisma и запускаем приложение
CMD ["sh", "-c", "echo 'Current directory: ' $(pwd) && ls -al /app && yarn run start:dev"]
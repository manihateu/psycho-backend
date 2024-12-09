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

# Компилируем TypeScript в JavaScript
RUN yarn run build
RUN ls -al /app/dist
# Финальный образ

# Копируем зависимости и сборку
COPY ./node_modules ./node_modules
COPY ./dist ./dist

# Копируем Prisma файлы
COPY ./prisma ./prisma

# Генерируем Prisma Client
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN chmod +x /app/dist/main.js
RUN ls -al /app/dist
# Открываем порт приложения
EXPOSE 3000

# Выполняем миграции Prisma и запускаем приложение
CMD ["sh", "-c", "echo 'Current directory: ' $(pwd) && ls -al /app && node /app/dist/main.js"]
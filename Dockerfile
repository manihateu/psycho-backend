# Указываем базовый образ Node.js
FROM node:23-alpine 

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

COPY dist ./dist 

# RUN npx prisma migrate deploy
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/main"]
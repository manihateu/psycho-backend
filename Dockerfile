# Указываем базовый образ Node.js
FROM node:22-alpine 

WORKDIR /app
RUN apk update && apk add --no-cache openssl
# RUN apt install openssl
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .

RUN yarn run build

COPY dist ./dist 
# RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && yarn run start:prod"]
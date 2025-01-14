# Указываем базовый образ Node.js
FROM node:22-alpine 

WORKDIR /app
RUN apk update && apk add --no-cache openssl
# RUN apt install openssl
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

# RUN yarn run build

# COPY dist ./dist 
RUN sleep 20
RUN npx prisma migrate deploy
RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]
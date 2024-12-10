# Указываем базовый образ Node.js
FROM node:23-alpine 

WORKDIR /app
# RUN apt install openssl
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

COPY dist ./dist 

RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["node", "dist/main"]
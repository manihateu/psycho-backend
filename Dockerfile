FROM node:23

WORKDIR /usr/src/

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN ls
RUN npx prisma migrate deploy

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start:prod"]
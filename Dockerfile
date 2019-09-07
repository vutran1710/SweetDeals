FROM node:10-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD npm run prod

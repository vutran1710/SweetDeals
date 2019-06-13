FROM node:8-alpine

WORKDIR /app

COPY . .

RUN npm install --only=prod

RUN mv prod.env .env

CMD [ "npm", "start" ]

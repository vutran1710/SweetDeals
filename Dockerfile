FROM node:8-alpine

WORKDIR /app

COPY . .

RUN npm install --only=prod

CMD [ "npm", "start:prod" ]

FROM node:10-jessie

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "start:prod" ]

FROM node:10-alpine

WORKDIR /app

COPY build/ .

RUN "echo $DB"

EXPOSE 8000

CMD node server/bundle.js

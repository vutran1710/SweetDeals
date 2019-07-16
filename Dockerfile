FROM node:10-jessie

WORKDIR /app

COPY build/ .

EXPOSE 8000

CMD [ "node", "server/bundle.js" ]

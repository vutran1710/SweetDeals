FROM node:10-jessie

ARG NODE_ENV PORT ORIGIN DB HTML_PATH

ENV NODE_ENV=$NODE_ENV PORT=$PORT ORIGIN=$ORIGIN DB=$DB HTML_PATH=$HTML_PATH

WORKDIR /app

COPY . .

RUN npm install

RUN echo ${DB}

EXPOSE 8000

CMD npm run prod

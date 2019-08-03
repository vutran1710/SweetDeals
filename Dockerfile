FROM node:10-jessie

ARG PORT
ARG ORIGIN
ARG DB
ARG HTML_PATH

ENV PORT=$PORT ORIGIN=$ORIGIN DB=$DB HTML_PATH=$HTML_PATH

WORKDIR /app

COPY . .

RUN npm install

RUN ["NODE_ENV=production", "npm run prod"]

EXPOSE 8000

CMD ["node", "build/server/bundle.js"]

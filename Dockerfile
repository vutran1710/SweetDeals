FROM node:10-jessie

WORKDIR /app

COPY . .

RUN npm install

RUN echo $DB

EXPOSE 8000

CMD npm run prod

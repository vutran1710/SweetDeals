FROM node:10-jessie

WORKDIR /app

COPY . .

RUN chmod +x shellscript.sh

RUN npm install

EXPOSE 8000

CMD npm run prod

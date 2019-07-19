FROM node:10-jessie

WORKDIR /app

COPY . .

RUN npm install

RUN apt-get update && apt-get install -y curl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.14.3/bin/linux/amd64/kubectl
RUN chmod +x ./kubectl
RUN mv ./kubectl /usr/local/bin/kubectl

EXPOSE 8000

CMD npm run prod

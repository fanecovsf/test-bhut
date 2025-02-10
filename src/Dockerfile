FROM node:22-alpine3.18

RUN apk add --no-cache bash tzdata curl
RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo "America/Sao_Paulo" > /etc/timezone

RUN npm install -g tsx
RUN npm install -g pm2
RUN npm install -g typescript

WORKDIR /usr/src

COPY ../package*.json ./

COPY ../tsconfig.json /usr/tsconfig.json

RUN npm install

COPY ./src .

COPY .env.prod /usr/.env.prod

RUN apk add --no-cache dos2unix && find ./jobs/workers -type f -name "*.ts" -exec dos2unix {} +

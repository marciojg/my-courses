FROM node:16-alpine3.14

EXPOSE 3000

RUN apk upgrade \
&&  apk add sqlite-dev

RUN npm install -g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app

COPY . .

CMD [ "sh", "-c", "npm install && npm run start:dev" ]

FROM node:10

EXPOSE 4200

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g @angular/cli && \
    npm install -g typescript

COPY . .

CMD npm install && ng serve --host 0.0.0.0 --port 4200
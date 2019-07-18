FROM node:10

EXPOSE 4200 8080

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g @angular/cli && \
    npm install -g typescript && \
    npm install -g http-server && \
    npm install bootstrap && \
    npm install jquery && \
    npm install tether

COPY . .

CMD npm install && ng serve --host 0.0.0.0 --port 4200
FROM node:10

RUN mkdir -p /usr/src/class

WORKDIR /usr/src/class

RUN npm install -g @angular/cli && \
    npm install -g typescript

COPY . .

CMD cd typescript/ && tsc -w
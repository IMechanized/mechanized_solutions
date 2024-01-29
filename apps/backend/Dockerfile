FROM node:18.18.2

ADD package.json /tmp/package.json

#ADD yarn.lock /tmp/yarn.lock

RUN rm -rf build

RUN cd /tmp && npm install

ADD ./ /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npm build

EXPOSE 1337

CMD ["node", "build/src/app.js"]

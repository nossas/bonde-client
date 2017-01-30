FROM node:7-alpine
MAINTAINER Nossas <tech@nossas.org>

ENV NEW_RELIC_HOME=./src NODE_ENV=production NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false PORT=5001 WEB_CONCURRENCY=2

RUN apk add --no-cache make gcc g++ python git
RUN npm install -g yarn
RUN mkdir /code

WORKDIR /code
COPY yarn.lock package.json /code/
RUN yarn
COPY . /code
RUN npm rebuild node-sass && yarn run build

CMD ["node", "./bin/server"]

EXPOSE 5001 3030

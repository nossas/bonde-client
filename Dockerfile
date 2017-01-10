FROM node:7-alpine
MAINTAINER Nossas <tech@nossas.org>

RUN apk add --no-cache make gcc g++ python
RUN npm install -g yarn
RUN mkdir /code
VOLUME /code
WORKDIR /code
COPY . /code
RUN yarn && npm rebuild node-sass
CMD ["node", "-r 'babel-register'", "./server"]
EXPOSE 3001

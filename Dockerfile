FROM node:7-alpine
MAINTAINER Nossas <tech@nossas.org>

RUN apk add --no-cache make gcc g++ python git
RUN mkdir /code
WORKDIR /code
COPY . /code
RUN npm install -g yarn
RUN yarn
CMD ["node", "./bin/server"]
EXPOSE 5000

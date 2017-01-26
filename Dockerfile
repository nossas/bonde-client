FROM node:7-alpine
MAINTAINER Nossas <tech@nossas.org>

RUN apk add --no-cache make gcc g++ python git
RUN npm install -g yarn
RUN mkdir /code
WORKDIR /code
COPY yarn.lock package.json /code/
RUN yarn
COPY . /code
RUN yarn run build
CMD ["node", "./bin/server"]
EXPOSE 5000

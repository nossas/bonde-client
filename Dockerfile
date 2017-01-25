FROM node:7-alpine
MAINTAINER Nossas <tech@nossas.org>

RUN apk add --no-cache make gcc g++ python git
RUN mkdir /code
VOLUME /code
WORKDIR /code
COPY . /code
RUN npm install 
CMD ["node", "./bin/server"]
EXPOSE 3001

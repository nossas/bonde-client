FROM mhart/alpine-node:latest
MAINTAINER Nossas <tech@nossas.org>

RUN apk add --no-cache make gcc g++ python

RUN npm install yarn pm2 -g

WORKDIR /app/

ADD . ./

RUN yarn

# Expose ports
EXPOSE 5000

# Start process.yml
CMD pm2-docker start ecosystem.config.js

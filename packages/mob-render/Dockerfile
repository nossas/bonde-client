FROM node:alpine
MAINTAINER Nossas <tech@nossas.org>

RUN set -x \
    && apt-get update \
    && apt-get install -y --no-install-recommends git

WORKDIR /code
COPY . .

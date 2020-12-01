FROM node:14-alpine AS builder

WORKDIR /usr/src/app

RUN yarn global add pnpm

COPY package*.json ./

COPY tsconfig*.json ./

COPY pnpm-workspace.yaml ./

COPY packages packages

RUN pnpm i

RUN pnpm m run build

FROM node:14-alpine
ENV NODE_ENV=production PORT=3000
RUN apk add --no-cache tini
WORKDIR /usr/src/app
RUN chown node:node .
USER node
#COPY package*.json ./
RUN npm install serve
COPY --from=builder /usr/src/app/packages/redes-client/build public
EXPOSE 3000
ENTRYPOINT [ "/sbin/tini","--", "./node_modules/.bin/serve", "public"]
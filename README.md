<img src="https://avatars2.githubusercontent.com/u/1479357?v=3&s=250" alt="Nossas logo" title="Nossas" align="right" height="90" width="90"/>

# Bonde Client

[![Build Status][circleimg]][circle]
[![Docker Automated Deploy][dockerautoimg]][circle]
[![Code Climate](https://codeclimate.com/github/nossas/bonde-client/badges/gpa.svg)](https://codeclimate.com/github/nossas/bonde-client)

[![Test Coverage](https://codeclimate.com/github/nossas/bonde-client/badges/coverage.svg)](https://codeclimate.com/github/nossas/bonde-client/coverage)
[![Issue Count](https://codeclimate.com/github/nossas/bonde-client/badges/issue_count.svg)](https://codeclimate.com/github/nossas/bonde-client)

---

## Configuration
Bonde Client app depends on the host name to decide how to behave, considering this you should [setup a wildcard DNS domain](http://asciithoughts.com/posts/2014/02/23/setting-up-a-wildcard-dns-domain-on-mac-os-x/) on the development environment.

## Container Development

### Requirements

* Git
* Docker [with Debian](https://docs.docker.com/engine/installation/linux/debian/) and [Mac OSX](https://www.docker.com/products/docker#/mac)
* [Docker Compose](https://docs.docker.com/compose/install/)

```
$ git --version
git version 2.7.4
$ docker -v
Docker version 1.12.5, build 7392c3b
$ docker-compose -v
docker-compose version 1.10.0-rc1, build ecff6f1
```

### Install
```
mkdir code/ && cd code/
git clone git@github.com:nossas/bonde-client.git
git clone git@github.com:nossas/bonde-server.git
cd bonde-server/ && git fetch origin && git checkout -b my-support-docker origin/add/support-docker
cd ../bonde-client && git fetch origin && git checkout -b my-refactor-ssr origin/add/refactor-ssr
docker-compose up -
```

When container start from the first time, you need to create database and run migrate, to do that, after docker-compose finish, run:

```
docker-compose exec postgres psql -Upostgres -c 'create database reboo;'
docker-compose exec postgres psql -Upostgres -c 'create database reboo_test;'
docker-compose exec api ./bin/rake db:migrate
docker-compose up --build
```

### Others Useful commands

```
docker-compose logs client # Show logs from container nodejs
docker-compose exec client /bin/ash # Open bash inside ruby container
docker-compose exec api /bin/bash # Open bash inside ruby container
docker-compose up --build # Force build from images
```

If you need to run npm or yarn do:

```
docker-compose exec client /bin/ash
npm rebuild node-sass

# or just

docker-compose exec client npm rebuild node-sass
```

To cleanup all volumes, images and containers run:

```
docker rmi $(docker images -a -q)
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker volume rm $(docker volume ls -f dangling=true -q)
```

And you are done!

## Local Development

### Requirements

* [Yarn](https://yarnpkg.com/) (optional)

### Install
```
npm install
npm start
```
And you are done!

### Tests
As simples as:
```
npm run test
```
Now sit and relax.

If you want to test a single file you can temporarily change the first line of `webpack.test.config.js` to:

```
var context = require.context('./app/scripts/tests', true, /MyComponentTest\.jsx/);
```

### Deploy
We have now two environments, staging and production, hosted by Heroku. All you have to do is to push changes to the master branch of these Heroku repositories, and it will be automatically deployed.

Add staging and production environments into your list of remote repos:
```
git remote add dokku dokku@server:0-client
git remote add dokku-prod dokku@server:0-client
```

Commit your changes to the desired environment:
```
git push dokku commithash:master
git push dokku-prod commithash:master
```

## Links
- [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/888220)
- [Invision](https://projects.invisionapp.com/share/763UO3YDT#/screens)
- [Zeplin](https://app.zeplin.io/project.html#pid=55d1d57e14a5317a0e909551)

[circleimg]: https://img.shields.io/circleci/project/nossas/bonde-client.svg?style=flat-square
[circle]: https://circleci.com/gh/nossas/bonde-client
[dockerautoimg]: https://img.shields.io/badge/dokku-auto%20deploy-blue.svg?style=flat-square

<h1 align="center">BONDE</h1>

<p align="center">
  <img
    src="https://s3.amazonaws.com/hub-central/uploads/logo-nossas-20170517185909.svg"
    width="320"
    height="320"
    alt="BONDE Logo"
  />
  <br />
  <p style="margin-top: 50px" align="center">
    <a href="http://ci.bonde.org/nossas/bonde-client">
      <img
        alt="Build Status"
        src="http://ci.bonde.org/api/badges/nossas/bonde-client/status.svg"
      />
    </a>
    <a href="https://github.com/nossas/bonde-client/issues">
      <img
        alt="Opened Issues Count"
        src="https://img.shields.io/github/issues-raw/nossas/bonde-client.svg"
      />
    </a>
    <br />
    <a href="https://hub.docker.com/r/nossas/bonde-client">
      <img
        alt="Docker Automated Deploy"
        src="https://img.shields.io/docker/automated/nossas/bonde-client.svg"
      />
    </a>
    <a href="https://hub.docker.com/r/nossas/bonde-client/builds">
      <img
        alt="Docker Build Status"
        src="https://img.shields.io/docker/build/nossas/bonde-client.svg"
      />
    </a>
    <br />
    <a href="https://github.com/nossas/bonde-client/blob/master/LICENSE">
      <img
        alt="Licence"
        src="https://img.shields.io/github/license/nossas/bonde-client.svg"
      />
    </a>
    <a href="https://conventionalcommits.org">
      <img
        alt="Conventional Commits"
        src="https://img.shields.io/badge/Conventional%20Commits-1.0.0--beta.1-brightgreen.svg"
      />
    </a>
  </p>
</p>


##

[![Greenkeeper badge](https://badges.greenkeeper.io/nossas/bonde-client.svg)](https://greenkeeper.io/)

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

### One-line installation
```
# Install
sh <(curl -s https://raw.githubusercontent.com/nossas/bonde-install/master/install.sh)

# Uninstall
sh <(curl -s https://raw.githubusercontent.com/nossas/bonde-install/master/uninstall.sh)
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

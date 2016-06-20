[![Build Status](https://travis-ci.org/ourcities/hub-client.svg?branch=master)](https://travis-ci.org/ourcities/hub-client)
[![Dependencies
Status](https://david-dm.org/ourcities/hub-client.svg)](https://david-dm.org/ourcities/hub-client)
[![Dev Dependencies
Status](https://david-dm.org/ourcities/hub-client/dev-status.svg)](https://david-dm.org/ourcities/hub-client#info=devDependencies)

# Hub Client
## Configuration
Hub Client app depends on the host name to decide how to behave, considering this you should [setup a wildcard DNS domain](http://asciithoughts.com/posts/2014/02/23/setting-up-a-wildcard-dns-domain-on-mac-os-x/) on the development environment.
## Install
```
npm install
npm run dev
```
And you are done!

## Tests
As simples as:
```
npm run test
```
Now sit and relax.

If you want to test a single file you can temporarily change the first line of `webpack.test.config.js` to:

```
var context = require.context('./app/scripts/tests', true, /MyComponentTest\.jsx/);
```

## Deploy
We have now two environments, staging and production, hosted by Heroku. All you have to do is to push changes to the master branch of these Heroku repositories, and it will be automatically deployed.

Add staging and production environments into your list of remote repos:
```
git remote add staging https://git.heroku.com/hub-client-staging.git
git remote add production https://git.heroku.com/hub-client.git
```

Commit your changes to the desired environment:
```
git push staging master
git push production master
```

## Links
- [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/888220)
- [Invision](https://projects.invisionapp.com/share/763UO3YDT#/screens)
- [Zeplin](https://app.zeplin.io/project.html#pid=55d1d57e14a5317a0e909551)

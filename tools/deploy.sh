#!/bin/bash -e
REPO_URI="dokku@reboo-staging.org:0-client"
if [ ! -z "$CIRCLE_TAG" ]; then
  REPO_URI="dokku@reboo.org:0-client"
fi

git fetch --unshallow origin
git remote add deploy $REPO_URI

git push -f deploy $CIRCLE_SHA1:refs/heads/master

if [ ! -z "$CIRCLE_TAG" ]; then
  git remote add bonde "dokku@bonde.org:2-bonde"
  git remote add deploy-ssl "dokku@reboo.org:1-client-ssl"
  git push -f deploy-ssl $CIRCLE_SHA1:refs/heads/master
  git push -f bonde $CIRCLE_SHA1:refs/heads/master
fi

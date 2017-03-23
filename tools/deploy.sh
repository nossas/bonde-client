#!/bin/bash -e
REPO_URI="dokku@reboo-staging.org:0-client"
if [ ! -z "$CIRCLE_TAG" ]; then
  REPO_URI="dokku@bonde.org:0-client"
fi

git fetch --unshallow origin

git remote add reboo $REPO_URI
git push -f reboo $CIRCLE_SHA1:refs/heads/master

if [ ! -z "$CIRCLE_TAG" ]; then
  git remote add bonde dokku@bonde.org:1-bonde
  git push -f bonde $CIRCLE_SHA1:refs/heads/master
fi

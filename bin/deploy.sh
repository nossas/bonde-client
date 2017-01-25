#!/bin/bash -e
REPO_URI="dokku@reboo-staging.org:0-client"
if [ ! -z "$CIRCLE_TAG" ]; then
  REPO_URI="dokku@reboo.org:0-client"
fi

git fetch --unshallow origin

git remote add deploy $REPO_URI

git push -f deploy $CIRCLE_SHA1:refs/heads/master

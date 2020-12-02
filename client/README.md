# BONDE

<p>
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

## Requirements

* NodeJS
* Docker (optional)

## Before Start

We start to use two strategies to handle with different problems. The first one, how to unify our codebase to newcomers have an easier path? Our answer is: git submodules. And the second, how to share sessions between different clients? Our answer is: share localstorage across multiple windows.

### Git Modules

After clone this repo, if you want edit any other part of BONDE besides clients app, you should run the following commands:

```
git submodule init
git submodule update
```

* [Official help page](https://git-scm.com/book/en/v2/Git-Tools-Submodules)


### Cross Storage

To have access to localstorage in different apps we must configure a common url to these apps. In local development, we use ```bonde.devel```

We recommend add the following alias to your ```/etc/hosts```:

```
127.0.0.1 api-rest.bonde.devel api-graphql.bonde.devel api-v2.bonde.devel graphql-auth.bonde.devel

127.0.0.1 bonde.devel app.bonde.devel admin-canary.bonde.devel cross-storage.bonde.devel chatbot.bonde.devel

127.0.0.1 3-vamos-limpar-o-tiete.bonde.devel 2-save-the-whales.bonde.devel 1-vamos-limpar-o-tiete.bonde.devel
```

## Get started

Before start installing, change ```.bashrc``` to add nvm and arkade to user's path.

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

export PATH=$PATH:$HOME/.arkade/bin/
```

Install NodeJS with a litle help of my friend: [nvm](https://github.com/nvm-sh/nvm), node version manager.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
```

To handle dependencies at monorepo, [pnpm](https://github.com/pnpm/pnpm)

```
curl -L https://raw.githubusercontent.com/pnpm/self-installer/master/install.js | node
```


```
pnpm i
pnpm m run dev
```

Finally, we will populate our enviroment configs to each client package. We recommend copy our example in each case.

Now when you change an client applications, you can see what happens locally! Go to: http://app.bonde.devel:5000 and change the content of component```Header.H1``` at ```client/packages/accounts-client/src/scenes/LoginPage/index.tsx#L31``` to ```Hello World```. After few seconds you should see the page updated.


## Second Stage Development

After make some changes on any application and want to share with the world, we use  [Waypoint](https://github.com/hashicorp/waypoint/
) from hashicorp. The tools enable more granular ways to build, deploy and release in general task connected with Continuos Integration(CI) and Continuous Deploy(CD).

We recommend to install [Arkade](https://github.com/alexellis/arkade) - cli to install others cli tools, like kubectl, k3d or kind.


```
curl -sLS https://dl.get-arkade.dev | sudo sh
arkade get kubectl
```

We recommend to install waypoint via apt-get:

```
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -

sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"

sudo apt-get update && sudo apt-get install waypoint
```

VERY IMPORTANT: The build are executed locally with local variables. CHECK ENV VARS BEFORE BUILD.

Then as configured in waypoint.hcl file, deploy must occurs and and url should appears in the end of command.


```
waypoint init

waypoint up
```

## Third Stage Development

Next steps are how to create a local enviroment to host BONDE.

First, install [Docker](https://docker.com)

```
curl https://get.docker.com | sh

sudo usermod -aG docker $USER
```

Then, install [Arkade](https://github.com/alexellis/arkade) - cli to install others tools, like kubectl, k3d or kind.


```
curl -sLS https://dl.get-arkade.dev | sudo sh
```

```
arkade get kubectl
arkade get k3d
```

Or create a local context ```k3d create c```

```
kubectl get nodes
```

To work with remote enviroments, you should configure kubernetes and setup env variables to corret domain and path.

## Client Defaults

Build and tests based on [Create React App with Typescript](https://create-react-app.dev/)

**Commands**

- Tests:

```sh
pnpm m run tests # pnpm m run coverage
```

- Development server:

```sh
pnpm m run start
```

- Production build:

```sh
pnpm m run build
# pnpm m run start
```


## How to add new env variables to build

Add them inside the `.drone.yml` file. That's where  CI setup lives, so when needed, add enviroment variables inside the "enviroment" indentation.

```yml
  build:
    enviroment: 
      - ENV=FOOBAR
```

You'll need to specify them inside the "build" (staging) and "production-build" (production) indentation. Therefore, change the env according to what you'll need in each enviroment.

PS: Don't add secret envs in there, this file is public and so will be the tokens/sensity info you'll be inserting there.

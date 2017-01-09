import React from 'react'

export default function stubRouterContext (Component, props, stubs) {
  const RouterStub = Object.assign({}, {
    makePath () {},
    makeHref () {},
    transitionTo () {},
    replaceWith () {},
    goBack () {},
    getCurrentPath () {},
    getCurrentRoutes () {},
    getCurrentPathname () {},
    getCurrentParams () {},
    getCurrentQuery () {},
    isActive () {},
    getRouteAtDepth () {},
    setRouteComponentAtDepth () {}
  }, stubs)

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.object,
      routeDepth: React.PropTypes.number
    },

    getChildContext () {
      return {
        router: RouterStub,
        routeDepth: 0
      }
    },

    render () {
      return <Component {...props} />
    }
  })
}

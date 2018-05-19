import React from 'react'
import { Route as ReactRoute, Redirect } from 'react-router-dom'

const Route = ({
  assert,
  component: Component,
  redirectTo,
  ...ownProps
}) => {
 
  const valid = typeof assert === 'function' ? assert() : assert

  return (
    <ReactRoute
      {...ownProps}
      render={props => (
        (valid || !redirectTo) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: redirectTo, state: { from: props.location } }}
          />
        )
      )}
    />
  )
}

Route.defaultProps = {
  assert: true
}

export default Route

import React from 'react'
import { Route as ReactRoute, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

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

Route.propTypes = {
  assert: PropTypes.any,
  component: PropTypes.func,
  redirectTo: PropTypes.string,
  location: PropTypes.string
}

export default Route

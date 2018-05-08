import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  authenticated,
  redirectTo,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={props => (
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: redirectTo, state: { from: props.location } }}
        />
      )
    )}
  />
)

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired
}

PrivateRoute.defaultProps = {
  authenticated: false
}

/**
 * Component representing a Route, used to render component
 * only when authenticated.
 *
 * @param {boolean} [authenticated=false] - When false user is redirected.
 * @param {string} redirectTo - Redirect used when authenticated is false.
 * @param {function} component - Component  used on render when authenticated
 * is true.
 *
 */
export default PrivateRoute

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({
  component: Component,
  authenticated,
  redirectTo,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={props => (
      authenticated && redirectTo ? (
        <Redirect
          to={{ pathname: redirectTo, state: { from: props.location } }}
        /> 
      ) : (
        <Component {...props} />
      )
    )}
  />
)

PublicRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string
}

PublicRoute.defaultProps = {
  authenticated: false
}

/**
 * Component representing a Route, used to render component.
 *
 * @param {boolean} [authenticated=false] - When true and you pass redirectTo, user is redirected.
 * @param {string} [redirectTo] - Redirect used when authenticated is false.
 * @param {function} component - Component  used on render when authenticated
 * is false or not pass redirectTo.
 *
 */
export default PublicRoute

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

export default PublicRoute

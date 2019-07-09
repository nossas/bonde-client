import React from 'react'
import PropTypes from 'prop-types'

const NotFound = ({ location }) => (
  <h1>No match to {location.pathname}</h1>
)

NotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default NotFound

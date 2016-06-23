import React, { PropTypes } from 'react'


const RenderInputError = ({ error, touched }) => {
  if (error && touched) {
    return (
      <span className="red ml2">{error}</span>
    )
  }
  return <noscript></noscript>
}

RenderInputError.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool.isRequired
}

export default RenderInputError

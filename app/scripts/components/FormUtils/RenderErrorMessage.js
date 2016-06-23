import React, { PropTypes } from 'react'


const RenderErrorMessage = ({ error }) => {
  if (error) {
    return (
      <div className="red center mt2">{ error }</div>
    )
  }
  return <noscript></noscript>
}

RenderErrorMessage.propTypes = {
  error: PropTypes.string,
}

export default RenderErrorMessage

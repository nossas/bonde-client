import React, { PropTypes } from 'react'
import classnames from 'classnames'

const FontPreview = ({ componentClass: Component, className, text }) => (
  <div className={classnames('bg-white border rounded p2 mb3', className)}>
    <Component className='m0'>{text}</Component>
  </div>
)

FontPreview.propTypes = {
  componentClass: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  text: PropTypes.string.isRequired
}

FontPreview.defaultProps = {
  componentClass: 'h1'
}

export default FontPreview

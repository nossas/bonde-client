import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'


class FormError extends Component {

  render() {
    const { $formRedux: { error } } = this.context
    const { className } = this.props

    return error ? (
        <div className={classnames("h5 bold center animated shake", className)}>
          {error}
        </div>
      ) : <noscript />
  }
}

FormError.contextTypes = {
  $formRedux: PropTypes.object
}

FormError.propTypes = {
  className: PropTypes.string
}

export default FormError

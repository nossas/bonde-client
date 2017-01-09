import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class SubmitButton extends Component {

  render () {
    const { $formRedux: { submitting } } = this.context
    const { children, className, position } = this.props

    return (
      <button
        type='submit'
        disabled={submitting}
        className={classnames('btn py2 caps white', className, submitting ? 'bg-gray95' : 'bg-pagenta')}
      >
        {children}
      </button>
    )
  }
}

SubmitButton.contextTypes = {
  $formRedux: PropTypes.object
}

SubmitButton.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
}

export default SubmitButton

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class ControlButtons extends Component {
  render() {
    const { $formRedux: { floatButton, successMessage } } = this.context
    const { submitting, submitted, dirty, formInline, valid, ...props } = this.props
    return (
      <div className={classnames(
          'control-buttons',
          formInline ? 'inline-block ml1' : 'flex flex-wrap mt1'
      )}>
        <input
          type="submit"
          className={classnames(
            'btn h3 col-12 mt1 mb2 mx2 white p2 rounded',
            !valid ? 'bg-gray95' : 'bg-pagenta'
          )}
          disabled={!valid || submitting || !dirty}
          value={(submitting ? 'Salvando...' : (floatButton || 'Continuar'))}
        />
        {
          submitted && !!successMessage &&
          <div className="success-message olive h4 px2 mt2">
            {successMessage}
            <i className="fa fa-check-circle olive" />
          </div>
        }
      </div>
    )
  }
}

ControlButtons.contextTypes = {
  $formRedux: PropTypes.object,
}

ControlButtons.propTypes = {
  submitting: PropTypes.bool,
  submitted: PropTypes.bool.isRequired,
  dirty: PropTypes.bool,
  valid: PropTypes.bool,
  formInline: PropTypes.bool.isRequired
}

ControlButtons.defaultProps = {
  formInline: false
}

export default ControlButtons

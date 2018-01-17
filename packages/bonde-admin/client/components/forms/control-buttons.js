import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import classnames from 'classnames'

export class ControlButtons extends Component {
  render () {
    const { $formRedux: { floatButton, successMessage } } = this.context
    const { onCancel, submitting, submitted, dirty, formInline, valid, intl } = this.props
    return (
      <div className={classnames(
          'control-buttons',
          formInline ? 'inline-block ml1' : 'flex flex-wrap mt1'
      )}>
        {onCancel && (
          <button
            className='btn h3 col-4 ml2 white mt1 mb2 p2 rounded bg-gray'
            onClick={onCancel}
          >
            <FormattedMessage
              id='components--control-buttons.cancel'
              defaultMessage='Voltar'
            />
          </button>
        )}
        <input
          type='submit'
          className={classnames(
            'btn h3 mt1 mb2 white p2 rounded',
            !valid ? 'bg-gray95' : 'bg-pagenta',
            onCancel ? 'col-7 ml3' : 'col-12 mx2'
          )}
          disabled={!valid || submitting || !dirty}
          value={(submitting
            ? intl.formatMessage({
              id: 'components--control-buttons.input.value.saving',
              defaultMessage: 'Salvando...'
            })
            : floatButton || intl.formatMessage({
              id: 'components--control-buttons.input.value.default',
              defaultMessage: 'Continuar'
            })
          )}
        />
        {submitted && !!successMessage && (
          <div className='success-message olive h4 px2 mt2'>
            {successMessage}
            <i className='fa fa-check-circle olive' />
          </div>
        )}
      </div>
    )
  }
}

ControlButtons.contextTypes = {
  $formRedux: PropTypes.object
}

ControlButtons.propTypes = {
  submitting: PropTypes.bool,
  submitted: PropTypes.bool.isRequired,
  dirty: PropTypes.bool,
  valid: PropTypes.bool,
  formInline: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
}

ControlButtons.defaultProps = {
  formInline: false
}

export default injectIntl(ControlButtons)

import PropTypes from 'prop-types'
import React from 'react'

import DivFloat from '../div-float'
import Button from '../button'

// Dependency module
import { FormRedux, SuccessMessage } from '~client/components/forms'

const SettingsForm = ({ children, buttonText, successMessage, ...formProps }) => (
  <FormRedux nosubmit {...formProps}>
    {children}
    <DivFloat>
      <Button
        type='submit'
        disabled={formProps.submitting}
      >
        {buttonText}
      </Button>
      <SuccessMessage text={successMessage} />
    </DivFloat>
  </FormRedux>
)

SettingsForm.propTypes = {
  buttonText: PropTypes.string,
  successMessage: PropTypes.string
}

SettingsForm.defaultProps = {
  buttonText: 'Salvar',
  successMessage: 'Dados editados com sucesso'
}

export default SettingsForm

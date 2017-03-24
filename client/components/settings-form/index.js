import React, { PropTypes } from 'react'

import { FormRedux, SuccessMessage } from '~client/components/forms'
import Button from '~client/components/button'
import DivFloat from '~client/components/div-float'


const SettingsForm = ({ children, buttonText, successMessage, ...formProps }) => (
  <FormRedux nosubmit {...formProps}>
    {children}
    <DivFloat>
      <Button type='submit' disabled={formProps.submitting} >{buttonText}</Button>
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

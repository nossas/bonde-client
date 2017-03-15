import React from 'react'

import { FormFinishMessage } from '~mobilizations/widgets/components'
import { FormTellAFriend } from '~widget-plugins/form/components'

const FormSettingsFinishPage = props => (
  <FormFinishMessage
    {...props}
    TellAFriend={FormTellAFriend}
    successMessage='Formulário de pós-inscrição salvo com sucesso!'
  />
)

export default FormSettingsFinishPage

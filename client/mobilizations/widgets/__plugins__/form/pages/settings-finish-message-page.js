import React from 'react'

// Parent module dependencies
import { FormFinishMessage } from '~mobilizations/widgets/components'

// Current module dependencies
import { FormTellAFriend, SettingsMenu } from '../components'

const SettingsFinishMessagePage = props => (
  <FormFinishMessage
    {...props}
    SettingsMenu={SettingsMenu}
    TellAFriend={FormTellAFriend}
    successMessage='Formulário de pós-inscrição salvo com sucesso!'
  />
)

export default SettingsFinishMessagePage

import React from 'react'

// Parent module dependencies
import { FormFinishMessage } from '../../../components'

// Current module dependencies
import { PressureTellAFriend, SettingsMenu } from '../components'

const SettingsFinishMessagePage = props => {
  return (
    <FormFinishMessage
      {...props}
      SettingsMenu={SettingsMenu}
      TellAFriend={PressureTellAFriend}
      successMessage='Formulário de pós-pressão salvo com sucesso!'
    />
  )
}

export default SettingsFinishMessagePage

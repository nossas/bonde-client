import React from 'react'

// Parent module dependencies
import { FormFinishMessage } from '../../../components'

// Current module dependencies
import { MatchTellAFriend, SettingsMenu } from '../components'

const SettingsFinishMessagePage = props => {
  return (
    <FormFinishMessage
      {...props}
      SettingsMenu={SettingsMenu}
      TellAFriend={MatchTellAFriend}
      successMessage='Formulário de pós-combinação salvo com sucesso!'
    />
  )
}

export default SettingsFinishMessagePage

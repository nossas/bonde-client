import React from 'react'

// Parent module dependencies
import { FormFinishMessage } from '../../../components'

// Current module dependencies
import { DonationTellAFriend, SettingsMenu } from '../components'

const SettingsFinishMessagePage = props => {
  return (
    <FormFinishMessage
      {...props}
      SettingsMenu={SettingsMenu}
      TellAFriend={DonationTellAFriend}
      successMessage='Formulário de pós-doação salvo com sucesso!'
    />
  )
}

export default SettingsFinishMessagePage

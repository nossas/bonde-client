import React from 'react'

import { FormFinishMessage } from '~mobilizations/widgets/components'
import { PressureTellAFriend, SettingsMenu } from '~widget-plugins/pressure/components'

const PressureSettingsFinishPage = props => (
  <FormFinishMessage
    {...props}
    SettingsMenu={SettingsMenu}
    TellAFriend={PressureTellAFriend}
    successMessage='Formulário de pós-pressão salvo com sucesso!'
  />
)

export default PressureSettingsFinishPage

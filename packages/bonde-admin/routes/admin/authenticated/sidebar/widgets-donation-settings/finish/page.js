import React from 'react'
import { FormattedMessage } from 'react-intl'

import { FormFinishMessage } from '~client/mobilizations/widgets/components'
import { DonationTellAFriend } from '~client/mobilizations/widgets/__plugins__/donation/components'

const DonationSettingsFinish = props => (
  <FormFinishMessage
    {...props}
    TellAFriend={DonationTellAFriend}
    successMessage={
      <FormattedMessage
        id='page--donation-widget-finish.form.success-message'
        defaultMessage='Formulário de pós-doação salvo com sucesso!'
      />
    }
  />
)

export default DonationSettingsFinish

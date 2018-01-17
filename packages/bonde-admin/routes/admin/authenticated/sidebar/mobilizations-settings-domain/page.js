import React from 'react'
import { FormattedMessage } from 'react-intl'

import { SettingsForm } from '~client/ux/components'
import { FormDomain } from '~client/mobilizations/components'
import * as paths from '~client/paths'

const MobilizationsSettingsDomainPage = ({ location, history, mobilization, ...formProps }) => {
  return (
    <FormDomain
      {...formProps}
      mobilization={mobilization}
      formComponent={SettingsForm}
      redirectToCreateDNS={() => history.push(paths.communityDomainCreate())}
      successMessage={
        <FormattedMessage
          id='page--mobilizations-domain.form-domain.success-message'
          defaultMessage='Dados de domínio salvos com sucesso'
        />
      }
    />
  )
}

export default MobilizationsSettingsDomainPage

import React from 'react'
import { browserHistory } from 'react-router'

import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsForm } from '~client/ux/components'
import { FormDomain, SettingsMenu } from '~client/mobilizations/components'
import * as paths from '~client/paths'

const MobilizationsSettingsDomainPage = ({ location, mobilization, ...formProps }) => {
  return (
    <SettingsPageLayout>
      <SettingsMenu mobilization={mobilization} location={location} />
      <SettingsPageContentLayout>
        <FormDomain
          {...formProps}
          mobilization={mobilization}
          formComponent={SettingsForm}
          successMessage='Dados de domínio salvos com sucesso'
          redirectToCreateDNS={() => browserHistory.push(paths.communityDomainCreate())}
        />
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsDomainPage

import React from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { SettingsForm } from '~client/ux/components'
import { FormDomain, SettingsMenu } from '~client/mobilizations/components'

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
        />
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsDomainPage

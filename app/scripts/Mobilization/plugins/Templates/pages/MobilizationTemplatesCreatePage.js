import React from 'react'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '../../../../../components/Layout'
import { MobilizationTemplatesBasicsForm } from '../components'

const MobilizationTemplatesCreatePage = props => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout
      title='Crie um template a partir da mobilização'
      className='pb4'
    />
    <SettingsPageContentLayout containerClassName='lg-col-11'>
      <MobilizationTemplatesBasicsForm {...props} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

export default MobilizationTemplatesCreatePage

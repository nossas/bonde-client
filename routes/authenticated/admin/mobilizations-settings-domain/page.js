import React from 'react'

import { Button, SuccessMessage } from '~components/forms'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu, FormCustomDomain } from '~mobilizations/components'
import { FloatLayout } from '~components/grids'

const MobilizationsSettingsDomainPage = props => {
  const { mobilization, fields, ...formProps } = props

  return (
    <SettingsPageLayout>
      <SettingsMenu {...props} />
      <SettingsPageContentLayout>
        <FormCustomDomain {...{ mobilization, fields, ...formProps }}>
          <FloatLayout position='floatTopRight'>
            <Button {...formProps} type='submit' className='btn bg-blacker rounded white'>
              {formProps.submitting ? 'Salvando...' : 'Salvar'}
            </Button>
            <SuccessMessage text='Dados editados com sucesso.' />
          </FloatLayout>
        </FormCustomDomain>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsDomainPage

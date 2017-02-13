import React from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { FormGroup, FormControl, ControlLabel } from '~components/forms'
import { SettingsMenu, MobilizationSettingsForm } from '~mobilizations/components'

const MobilizationsSettingsAnalyticsPage = props => {
  const { fields: { google_analytics_code: googleAnalyticsCode }, ...formProps } = props
  return (
    <SettingsPageLayout>
      <SettingsMenu {...props} />
      <SettingsPageContentLayout>
        <div className='mobilization-analytics-page darkengray'>
          <p className='h5'>
            Para acompanhar os resultados da sua mobilização, você precisa configurar
            uma conta no Google Analytics.
          </p>
          <p className='h5'>Siga os passos abaixo:</p>
          <ol className='h5'>
            <li className='link'>
              Crie uma conta no Google
              Analytics <a href='http://www.google.com/analytics/' target='_blank'>
                clicando aqui
              </a>
            </li>
            <li>
              Obtenha sua ID de acompanhamento no Google Analytics. É um código
              que começa sempre com as letras UA, que você verá após criar sua conta lá.
            </li>
            <li className='m0'>
              Copie a ID de acompanhamento e cole no campo abaixo:
              <MobilizationSettingsForm {...formProps}>
                <FormGroup controlId='googleAnalyticsCodeId' {...googleAnalyticsCode}>
                  <ControlLabel>ID do Google Analytics</ControlLabel>
                  <FormControl type='text' placeholder='UA-00000000-0' />
                </FormGroup>
              </MobilizationSettingsForm>
            </li>
            <li>
              Pronto! Você já pode acompanhar as estatísticas da sua mobilização
              no Google Analytics!
            </li>
          </ol>
        </div>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsAnalyticsPage

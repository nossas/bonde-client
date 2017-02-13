import React from 'react'

import { FormGroup, ControlLabel, FormControl } from '~components/forms'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu, MobilizationSettingsForm } from '~mobilizations/components'

const MobilizationsSettingsDomainPage = props => {
  const { mobilization, fields: { custom_domain: customDomain }, ...formProps } = props

  return (
    <SettingsPageLayout>
      <SettingsMenu {...props} />
      <SettingsPageContentLayout>
        <MobilizationSettingsForm {...formProps}>
          <p className='h5'>
            Você pode personalizar o endereço da sua mobilização caso já tenha um domínio.
            Preencha o campo abaixo e clique em Salvar.
          </p>
          <FormGroup controlId='customDomain' {...customDomain}>
            <ControlLabel>Domínio personalizado</ControlLabel>
            <FormControl type='text' placeholder='www.meudominio.com.br' />
          </FormGroup>
          <p>
            <strong>Atenção</strong>: você ainda precisa configurar o seu domínio no servidor de
            registro para que ele seja redirecionado para a página da sua mobilização. Para isso,
            utilize as informações abaixo.
          </p>
          <table className='col-12 left-align'>
            <tbody>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Dados</th>
              </tr>
              <tr>
                <td><code>{customDomain ? customDomain.value : ''}</code></td>
                <td><code>CNAME</code></td>
                <td><code>{mobilization.slug}.reboo.org</code></td>
              </tr>
            </tbody>
          </table>
        </MobilizationSettingsForm>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsDomainPage

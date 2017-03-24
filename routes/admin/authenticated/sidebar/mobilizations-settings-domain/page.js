import React from 'react'
import { SettingsMenu } from '~client/mobilizations/components'

import {
  FormGroup,
  ControlLabel,
  FormControl
} from '~client/components/forms'
import {
  SettingsPageLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import SettingsForm from '~client/components/settings-form'
import { isValidDomain } from '~client/utils/validation-helper'


const MobilizationsSettingsDomainPage = ({
  mobilization,
  location,
  fields: { custom_domain: customDomain },
  ...formProps
}) => {

  if (!mobilization.custom_domain) {
    formProps.buttonText = 'Lançar mobilização'
  } else {
    formProps.successMessage = `${mobilization.name} lançada com sucesso.`
  }

  return (
    <SettingsPageLayout>
      <SettingsMenu mobilization={mobilization} location={location} />
      <SettingsPageContentLayout>
        <SettingsForm {...formProps}>
          <p className='h5'>
            Aqui você pode personalizar o endereço da sua mobilização caso já tenha um domínio próprio.
            Por exemplo, se você já comprou www.nomedoseuprojeto.com.br, você pode usá-lo para este BONDE.
            Demais, né?
          </p>
          <FormGroup controlId='customDomain' {...customDomain}>
            <ControlLabel>Domínio personalizado</ControlLabel>
            <FormControl
              type='text'
              placeholder='www.meudominio.com.br'
              style={{ height: 40 }}
            />
          </FormGroup>
          <div className='h5'>
            <p>
              <strong>Não esqueça</strong>: você vai precisar configurar este domínio no servidor de
              registro para que ele redirecione a URL para a página da sua mobilização no BONDE.
              Pra isso, você vai precisar dessas informações aqui embaixo, anote aí:
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
            <p>
              Se tiver alguma dúvida, dá uma olhada no tópico "Configurando seu domínio no BONDE",
              no nosso tutorial, o <a href='https://trilho.bonde.org' target='_blank'>
                Trilho <i className='fa fa-external-link' style={{ fontSize: '.7rem' }} />
              </a>.
            </p>
          </div>
        </SettingsForm>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export const fields = ['id', 'custom_domain']

export const validate = values => {
  const errors = {}
  if (values.custom_domain && !isValidDomain(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}

export default MobilizationsSettingsDomainPage

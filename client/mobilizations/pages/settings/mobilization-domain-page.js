import React from 'react'
import { reduxForm } from 'redux-form'

import {
  FormGroup,
  ControlLabel,
  FormControl
} from '../../../../scripts/Dashboard/Forms'
import { isValidDomain } from '../../../../util/validation-helper'
import { MobilizationSettingsForm } from '../../components'
import { mapStateToProps, mapActionCreatorsToProps } from './map-to-props'


const MobilizationDomainPage = props => {

  const { mobilization, fields: { custom_domain }, ...formProps } = props

  return (
    <MobilizationSettingsForm {...formProps}>
      <p className="h5">
        Você pode personalizar o endereço da sua mobilização caso já tenha um domínio. Preencha o
        campo abaixo e clique em Salvar.
      </p>
        <FormGroup controlId="customDomain" {...custom_domain}>
          <ControlLabel>Domínio personalizado</ControlLabel>
          <FormControl type="text" placeholder="www.meudominio.com.br" />
        </FormGroup>
      <p>
        <strong>Atenção</strong>: você ainda precisa configurar o seu domínio no servidor de
        registro para que ele seja redirecionado para a página da sua mobilização. Para isso,
        utilize as informações abaixo.
      </p>
      <table className="col-12 left-align">
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Dados</th>
          </tr>
          <tr>
            <td><code>{custom_domain.value}</code></td>
            <td><code>CNAME</code></td>
            <td><code>{mobilization.slug}.reboo.org</code></td>
          </tr>
        </tbody>
      </table>
    </MobilizationSettingsForm>
  )
}

const fields = ['id', 'custom_domain']

const validate = values => {
  const errors = {}
  if (values.custom_domain && !isValidDomain(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}

export default reduxForm({
  form: 'mobilizationDomainForm',
  fields,
  validate
}, mapStateToProps, mapActionCreatorsToProps)(MobilizationDomainPage)

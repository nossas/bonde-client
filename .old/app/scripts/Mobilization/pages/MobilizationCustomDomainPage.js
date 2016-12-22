import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import * as MobilizationActions from '../MobilizationActions'
import * as Selectors from '../MobilizationSelectors'
import { isValidDomain } from '../../../util/validation-helper'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../Dashboard/Forms'
import { SettingsPageContentLayout } from '../../../components/Layout'

const MobilizationCustomDomainPage = ({
  ...rest,
  fields: { custom_domain: customDomain },
  mobilization,
  // Actions
  editMobilizationAsync
}) => (
  <SettingsPageContentLayout className="darkengray">
    <p className="h5">
      Você pode personalizar o endereço da sua mobilização caso já tenha um domínio. Preencha o
      campo abaixo e clique em Salvar.
    </p>
    <FormRedux
      {...rest}
      onSubmit={values => editMobilizationAsync({ ...mobilization, ...values })}
      className="transparent"
      floatButton="Salvar"
      successMessage="Formulário atualizado com sucesso!"
    >
      <FormGroup controlId="customDomain" {...customDomain}>
        <ControlLabel>Domínio personalizado</ControlLabel>
        <FormControl type="text" placeholder="www.meudominio.com.br" />
      </FormGroup>
    </FormRedux>
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
          <td><code>{customDomain.value}</code></td>
          <td><code>CNAME</code></td>
          <td><code>{mobilization.slug}.reboo.org</code></td>
        </tr>
      </tbody>
    </table>
  </SettingsPageContentLayout>
)

MobilizationCustomDomainPage.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  // Actions
  editMobilizationAsync: PropTypes.func.isRequired
}

const fields = ['custom_domain']
const validate = values => {
  const errors = {}
  if (values.custom_domain && !isValidDomain(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}
const mapStateToProps = (state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    mobilization,
    initialValues: mobilization || {}
  }
}

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate
}, mapStateToProps, MobilizationActions)(MobilizationCustomDomainPage)

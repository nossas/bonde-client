import React, { PropTypes } from 'react'
import classnames from 'classnames'

import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '~components/forms'
import { isValidDomain } from '~utils/validation-helper'

const FormCustomDomain = ({
  mobilization,
  fields: { custom_domain: customDomain },
  title,
  children,
  formReduxClassName,
  helperTextClassName,
  ...formProps
}) => (
  <FormRedux {...formProps} className={formReduxClassName} nosubmit>
    {title && <h3 className='h2 mt2 pt2 mb3 bold center'>{title}</h3>}
    <p className={classnames('h5', helperTextClassName)}>
      Você pode personalizar o endereço da sua mobilização caso já tenha um domínio.
      Preencha o campo abaixo e clique em Salvar.
    </p>
    <FormGroup controlId='customDomain' {...customDomain}>
      <ControlLabel>Domínio personalizado</ControlLabel>
      <FormControl
        type='text'
        placeholder='www.meudominio.com.br'
        style={{ height: 40 }}
      />
    </FormGroup>
    <div className={classnames('h5', helperTextClassName)}>
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
    </div>
    {children}
  </FormRedux>
)

export const fields = ['id', 'custom_domain']

export const validate = values => {
  const errors = {}
  if (values.custom_domain && !isValidDomain(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}

FormCustomDomain.propTypes = {
  mobilization: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired,
  fields: PropTypes.shape({
    custom_domain: PropTypes.shape({
      value: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default FormCustomDomain

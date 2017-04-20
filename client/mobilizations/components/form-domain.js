import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'

const FormDomain = ({
  formComponent: FormComponent,
  fields: { custom_domain: customDomain },
  mobilization,
  ...formProps
}) => (
  <FormComponent {...formProps}>
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
      />
    </FormGroup>

    <div className='separator' />

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
  </FormComponent>
)

FormDomain.propTypes = {
  formComponent: PropTypes.any.isRequired,
  fields: PropTypes.shape({
    custom_domain: PropTypes.object.isRequired
  }).isRequired,
  mobilization: PropTypes.object.isRequired
}

export default FormDomain

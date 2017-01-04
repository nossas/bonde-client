import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { decorate } from 'react-mixin'
import { Navigation } from 'react-router'
import { FormRedux, FormGroup, ControlLabel, FormControl, SubmitButton, FormError } from '../../Dashboard/Forms'

import * as actions from '../actions'
import * as paths from '../paths'


@decorate(Navigation)
class AddPage extends Component {

  componentWillReceiveProps(nextProps) {
    const { submitting } = this.props
    if (submitting && !nextProps.submitting && !nextProps.submitFailed) {
      this.transitionTo(paths.list())
    }
  }

  render() {

    const { create, fields: { name, city }, ...formProps } = this.props
    return (
      <div>
        <h1>Crie uma comunidade</h1>
        <h2>Comunidades do Nossas são grupos de ação que trabalham juntos por uma causa.</h2>
        <FormRedux
          nosubmit
          className="bg-white rounded"
          onSubmit={values => create(values)}
          {...formProps}
        >
          <FormGroup controlId="nameId" {...name}>
            <ControlLabel>Nome da comunidade</ControlLabel>
            <FormControl type="text" placeholder="Exemplo: Movimento 90º São Paulo" />
          </FormGroup>
          <FormGroup controlId="cityId" {...city}>
            <ControlLabel>Cidade da comunidade</ControlLabel>
            <FormControl type="text" placeholder="Exemplo: São Paulo" />
          </FormGroup>
          <SubmitButton className="col-12 rounded-bottom">
            {formProps.submitting ? 'Salvando...' : 'Criar comunidade'}
          </SubmitButton>
          <FormError className="mt2" />
        </FormRedux>
      </div>
    )
  }
}

const fields = ['name', 'city']

const validate = (values) => {
  const error = {}
  if (!values.name) {
    error.name = 'Informe o nome da comunidade'
  }
  if (!values.city) {
    error.city = 'Informe em qual cidade sua comunidade atua'
  }
  return error
}

export default reduxForm({
  form: 'addCommunityForm',
  fields,
  validate
}, null, actions)(AddPage)

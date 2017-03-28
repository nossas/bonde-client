import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from '~client/components/forms'
import * as Paths from '~client/paths'

class RegisterPage extends Component {

  componentWillReceiveProps (nextProps) {
    const { submitting } = this.props
    if (submitting && (!nextProps.submitting && !nextProps.submitFailed)) {
      browserHistory.push(Paths.login())
    }
  }

  render () {
    const {
      fields: {
        name,
        last_name: lastName,
        email,
        password,
        password2 },
      ...formProps
    } = this.props
    return (
      <div>
        <h1>Crie sua conta no Bonde.</h1>
        <FormRedux
          nosubmit
          className='bg-white rounded'
          {...formProps}
        >
          <div className='flex'>
            <FormGroup className='col-6' controlId='nameId' {...name}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type='text' placeholder='Seu nome' />
            </FormGroup>
            <FormGroup className='col-6' controlId='lastNameId' {...lastName}>
              <ControlLabel>Sobrenome</ControlLabel>
              <FormControl type='text' placeholder='Sobrenome' />
            </FormGroup>
          </div>
          <FormGroup controlId='emailId' {...email}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type='email' placeholder='exemplo@email.com.br' />
          </FormGroup>
          <FormGroup controlId='passwordId' {...password}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl type='password' placeholder='********' />
          </FormGroup>
          <FormGroup controlId='password2Id' {...password2}>
            <ControlLabel>Confirme sua senha</ControlLabel>
            <FormControl type='password' placeholder='********' />
          </FormGroup>
          <Button type='submit' className='btn caps col-12 p2 white rounded-bottom bg-pagenta'>
            {formProps.submitting ? 'Salvando...' : 'Criar conta'}
          </Button>
        </FormRedux>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  // Injected by react-redux
  submit: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

export default RegisterPage

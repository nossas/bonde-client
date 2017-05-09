import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'

import * as paths from '~client/paths'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from '~client/components/forms'

class LoginPage extends Component {
  componentWillReceiveProps (nextProps) {
    const { submitting } = this.props
    if (submitting && (!nextProps.submitting && !nextProps.submitFailed) && nextProps.user) {
      browserHistory.push('/')
    }
  }

  render () {
    const {
      fields: { email, password },
      login,
      errorMessage,
      ...formProps
    } = this.props

    return (
      <div>
        <div className='col-8 mb3 mx-auto'>
          <img alt='Logo Bonde' src={
            require('exenv').canUseDOM
              ? require('~client/images/logo-nossas.svg')
              : null
          } />
        </div>
        <FormRedux
          nosubmit
          className='bg-white rounded'
          onSubmit={values => login(values)}
          {...formProps}
        >
          <FormGroup controlId='emailId' {...email}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type='email' placeholder='exemplo@email.com' />
          </FormGroup>
          <FormGroup controlId='passwordId' {...password}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl type='password' placeholder='••••••••••' />
          </FormGroup>
          <Button type='submit' className='btn py2 caps white col-12 rounded-bottom bg-pagenta'>
            {formProps.submitting ? 'Carregando...' : 'Entrar'}
          </Button>
        </FormRedux>

        {!errorMessage || formProps.submitting ? null : (
          <div className='h5 white bold center animated shake mt2'>
            {errorMessage}
          </div>
        )}

        <p className='white center'>
          <FormattedMessage
            id='page--account-login.ask-register'
            defaultMessage='Ainda não é cadastrado?'
          />
          <br />
          <Link to={paths.createAccount()}>
            Clique para criar uma conta.
          </Link>
        </p>
      </div>
    )
  }
}

LoginPage.propTypes = {
  // Injected by redux
  login: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

export default LoginPage

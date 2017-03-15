import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'

import * as Paths from '~client/paths'
import { FormRedux, FormError, FormGroup, ControlLabel, FormControl, Button } from '~components/forms'

let logo
if (process.env.BROWSER) {
  logo = require('~client/images/logo-nossas.svg')
}

class LoginPage extends Component {

  componentWillReceiveProps (nextProps) {
    const { submitting } = this.props
    if (submitting && (!nextProps.submitting && !nextProps.submitFailed) && nextProps.user) {
      browserHistory.push('/')
    }
  }

  render () {
    const { login, fields: { email, password }, ...formProps } = this.props
    // const submitSuccess = (values) => {
    //   const redirectUrl = (params.redirect_to || '/')
    //   login(values, () => {
    //     browserHistory.push(redirectUrl)
    //   }
    // }

    return (
      <div>
        <div className='col-8 mb3 mx-auto'>
          <img src={logo} alt='Logo Bonde' />
        </div>
        <FormRedux nosubmit className='bg-white rounded' onSubmit={(values) => login(values)} {...formProps}>
          <FormGroup controlId='emailId' {...email}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type='email' placeholder='exemplo@email.com' />
          </FormGroup>
          <FormGroup controlId='passwordId' {...password}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl type='password' placeholder='••••••••••' />
          </FormGroup>
          <Button type='submit' className='white col-12 rounded-bottom'>
            {formProps.submitting ? 'Carregando...' : 'Entrar'}
          </Button>
          <FormError className='mt2' />
        </FormRedux>
        <p className='white center'>Ainda não é cadastrado? <Link to={Paths.createAccount()}><br />Clique para criar uma conta.</Link></p>
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

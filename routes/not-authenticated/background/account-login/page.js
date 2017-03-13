import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'

import { Loading } from '~components/await'
import * as paths from '~community/paths'
import { ListItem } from '~community/components'

class CommunityListPage extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoaded && nextProps.communities.length === 0) {
      browserHistory.push(paths.add())
    }
  }

  onClickItem (id) {
    this.props.select(id)
    browserHistory.push('/')
  }

  render () {
    const { isLoading, isLoaded, communities, user } = this.props

    return isLoading ? <Loading /> : (
      <div>
        <h1>Olá {user.first_name},</h1>
        <h2>Escolha uma das suas comunidades</h2>
        {isLoaded ? (
          <div className='rounded bg-white'>
            {communities && communities.map((community, key) => (
              <ListItem
                key={`list-item-${key}`}
                community={community}
                onClick={this.onClickItem.bind(this)}
              />
            ))}
          </div>
        ) : null}
        <p className='white center'>
          ou <Link to={paths.add()}>Crie uma nova comunidade</Link>
        </p>
      </div>
    )
  }
}

CommunityListPage.propTypes = {
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  communities: PropTypes.array,
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired
  }).isRequired,
  // Actions
  select: PropTypes.func.isRequired
}

export default CommunityListPage
// import React, { Component, PropTypes } from 'react'
// import { reduxForm } from 'redux-form'
// import { browserHistory, Link } from 'react-router'
//
// import * as AccountActions from '../actions'
// import logo from '../assets/logo-nossas.svg'
//
// import * as Paths from '../../Paths'
// import { FormRedux, FormError, FormGroup, ControlLabel, FormControl, Button } from '../../Dashboard/Forms'
// import { isValidEmail } from '../../../util/validation-helper'
//
// export default redirectUrl => {
//   class LoginPage extends Component {
//
//     componentWillReceiveProps (nextProps) {
//       const { submitting } = this.props
//       if (submitting && (!nextProps.submitting && !nextProps.submitFailed) && nextProps.user) {
//         browserHistory.push(redirectUrl || '/')
//       }
//     }
//
//     render () {
//       const { login, fields: { email, password }, ...formProps } = this.props
//
//       return (
//         <div>
//           <div className='col-8 mb3 mx-auto'>
//             <img src={logo} alt='Logo Bonde' />
//           </div>
//           <FormRedux nosubmit className='bg-white rounded' onSubmit={login} {...formProps}>
//             <FormGroup controlId='emailId' {...email}>
//               <ControlLabel>E-mail</ControlLabel>
//               <FormControl type='email' placeholder='exemplo@email.com' />
//             </FormGroup>
//             <FormGroup controlId='passwordId' {...password}>
//               <ControlLabel>Senha</ControlLabel>
//               <FormControl type='password' placeholder='••••••••••' />
//             </FormGroup>
//             <Button className='white col-12 rounded-bottom'>
//               {formProps.submitting ? 'Carregando...' : 'Entrar'}
//             </Button>
//             <FormError className='mt2' />
//           </FormRedux>
//           <p className='white center'>Ainda não é cadastrado? <Link to={Paths.createAccount()}><br />Clique para criar uma conta.</Link></p>
//         </div>
//       )
//     }
//   }
//
//   LoginPage.propTypes = {
//     // Injected by redux
//     login: PropTypes.func.isRequired,
//     // Injected by redux-form
//     fields: PropTypes.object.isRequired
//   }
//
//   const fields = ['email', 'password']
//
//   const validate = values => {
//     const errors = {}
//     if (!values.email) {
//       errors.email = 'Informe seu email'
//       errors.valid = false
//     } else if (!isValidEmail(values.email)) {
//       errors.email = 'Email inválido'
//       errors.valid = false
//     }
//     if (!values.password) {
//       errors.password = 'Informe sua senha'
//       errors.valid = false
//     }
//     return errors
//   }
//
//   return reduxForm({
//     form: 'loginForm',
//     fields,
//     validate
//   }, (state) => ({
//     user: state.auth.user
//   }), AccountActions)(LoginPage)
// }

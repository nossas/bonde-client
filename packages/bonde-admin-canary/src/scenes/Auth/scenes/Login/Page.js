import React from 'react'
import { Mutation } from 'react-apollo'
import { AuthAPI } from '../../../../services/auth' 
import AUTHENTICATE from './authenticate.graphql'


const AuthLogin = () => {
  let inputEmail
  let inputPassword

  return (
    <Mutation mutation={AUTHENTICATE}>
      {(authenticate, { data }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            authenticate({
              variables: {
                email: inputEmail.value,
                password: inputPassword.value
              }
            })
            .then(({ data }) => {
              AuthAPI.login(data)
            })
          }}
        >
          <input ref={node => { inputEmail = node }} type='text' placeholder='email' />
          <input ref={node => { inputPassword = node }} type='password' placeholder='password' />
          <button type='submit'>Go!</button>
        </form>
      )}
    </Mutation>
  )
}

export default AuthLogin

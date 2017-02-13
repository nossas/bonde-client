import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button } from '../forms'
import { actions as authActions } from '../../../authenticate/redux'


const FormLogin = (reduxFormProps) => {
  return (
    <Form {...reduxFormProps}>
      <Field
        component={Input}
        name='email'
        type='text'
        label='E-mail'
        placeholder='E-mail'
      />
      <Field
        component={Input}
        name='password'
        type='password'
        label='Senha'
        placeholder='Senha'
      />
      <Button type='submit'>Entrar</Button>
    </Form>
  )
}

export default reduxForm({
  form: 'formLogin',
  onSubmit: (values, dispatch) => dispatch(authActions.login(values))
})(FormLogin)

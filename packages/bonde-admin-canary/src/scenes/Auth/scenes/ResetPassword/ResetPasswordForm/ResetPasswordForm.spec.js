import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { Title } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { FormGraphQL, SubmitButton } from 'components/Form'
import { PasswordField } from '../../components'
import ResetPasswordForm from './ResetPasswordForm'
import resetPassword from './resetPassword.graphql'

test.beforeEach(t => {
  const i18n = key => key
  t.context.node = shallow(<ResetPasswordForm t={i18n} />)
})

// render
test('should render header labels', t => {
  const { node } = t.context
  const title = 'resetPassword.form.title'
  const subtitle = 'resetPassword.form.subtitle'
  
  t.is(node.find(Title.H2).props().children, title)
  t.is(node.find(Title.H4).props().children, subtitle)
})

test('should render a form graphql component with mutation', t => {
  const { node } = t.context
  const formGraphQL = node.find(FormGraphQL)

  t.is(formGraphQL.props().mutation, resetPassword)
})

test('should use token and newPassword on submit mutation', t => {
  t.plan(1)
  
  const { node } = t.context
  const token = 'my-token'
  node.setProps({
    token,
    handleSuccess: (opts) => {
      t.deepEqual(opts, {
        variables: {
          newPassword: values.password,
          token
        }
      })
    }
  })
  
  const submit = node.find(FormGraphQL).props().onSubmit
  const values = { password: '123456' }
  const mutation = opts => new Promise(resolve => resolve(opts))
  
  return submit(values, mutation)
})

test('should render a submit button', t => {
  const { node } = t.context
  const submitButton = node.find(SubmitButton)
  
  t.is(submitButton.length, 1)
  t.is(submitButton.props().children, 'resetPassword.form.submit')
})

test('should call handleSuccess when mutation done', t => {
  t.plan(1)
  const { node } = t.context
  node.setProps({ handleSuccess: (n) => t.is(n, 2) })
  
  const submit = node.find(FormGraphQL).props().onSubmit
  return submit({}, () => new Promise((resolve) => {
    resolve(2)
  }))
})

test('should render a button link to /auth/login', t => {
  const { node } = t.context
  const buttonLinkProps = node.find(ButtonLink).props()
  
  t.is(buttonLinkProps.children, 'resetPassword.form.cancel')
  t.is(buttonLinkProps.to, '/auth/login')
})

test('should render an input password', t => {
  const { node } = t.context
  const fieldProps = node.find('Field').props()
  
  t.is(fieldProps.name, 'password')
  t.is(fieldProps.label, 'resetPassword.fields.password.label')
  t.is(fieldProps.component, PasswordField)
})

test('should render hint about password < 6 chars', t => {
  const { node } = t.context
  const fieldProps = node.find('Field').props()

  t.is(fieldProps.hint, 'resetPassword.fields.password.hint')
})

test('should validate password field', t => {
  const { node } = t.context
  const fieldProps = node.find('Field').props()
  const required = fieldProps.validate[0]
  const min = fieldProps.validate[1]

  t.is(required(''), 'resetPassword.fields.password.required')
  t.is(min('123'), 'resetPassword.fields.password.min6')
})

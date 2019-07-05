import React from 'react'
import { shallow } from 'enzyme'
import { Title } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { FormGraphQL, SubmitButton } from 'components/Form'
import { PasswordField } from '../../components'
import ResetPasswordForm from './ResetPasswordForm'
import resetPassword from './resetPassword.graphql'
import { expect } from 'chai'

describe('scenes > Auth > scenes > ResetPassword > ResetPasswordForm > ResetPasswordForm', () => {
  let node
  beforeEach(() => {
    const i18n = key => key
    node = shallow(<ResetPasswordForm t={i18n} />)
  })
  // render
  it('should render header labels', () => {
    const title = 'resetPassword.form.title'
    const subtitle = 'resetPassword.form.subtitle'

    expect(node.find(Title.H2).props().children).to.be.equal(title)
    expect(node.find(Title.H4).props().children).to.be.equal(subtitle)
  })

  it('should render a form graphql component with mutation', () => {
    const formGraphQL = node.find(FormGraphQL)
    expect(formGraphQL.props().mutation).to.be.equal(resetPassword)
  })

  it('should use token and newPassword on submit mutation', done => {
    const token = 'my-token'
    node.setProps({
      token,
      handleSuccess: (opts) => {
        expect(opts).to.deep.equal({
          variables: {
            newPassword: values.password,
            token
          }
        })
        done()
      }
    })

    const submit = node.find(FormGraphQL).props().onSubmit
    const values = { password: '123456' }
    const mutation = opts => new Promise(resolve => resolve(opts))

    return submit(values, mutation)
  })

  it('should render a submit button', () => {
    const submitButton = node.find(SubmitButton)

    expect(submitButton).to.be.lengthOf(1)
    expect(submitButton.props().children).to.be.equal('resetPassword.form.submit')
  })

  it('should call handleSuccess when mutation done', done => {
    node.setProps({ handleSuccess: (n) => {
      expect(n).to.be.equal(2)
      done()
    } })

    const submit = node.find(FormGraphQL).props().onSubmit
    return submit({}, () => new Promise((resolve) => {
      resolve(2)
    }))
  })

  it('should render a button link to /auth/login', () => {
    const buttonLinkProps = node.find(ButtonLink).props()

    expect(buttonLinkProps.children).to.be.equal('resetPassword.form.cancel')
    expect(buttonLinkProps.to).to.be.equal('/auth/login')
  })

  it('should render an input password', () => {
    const fieldProps = node.find('Field').props()

    expect(fieldProps.name).to.be.equal('password')
    expect(fieldProps.label).to.be.equal('resetPassword.fields.password.label')
    expect(fieldProps.component).to.be.equal(PasswordField)
  })

  it('should render hint about password < 6 chars', () => {
    const fieldProps = node.find('Field').props()

    expect(fieldProps.hint).to.be.equal('resetPassword.fields.password.hint')
  })

  it('should validate password field', () => {
    const fieldProps = node.find('Field').props()
    const required = fieldProps.validate[0]
    const min = fieldProps.validate[1]

    expect(required('')).to.be.equal('resetPassword.fields.password.required')
    expect(min('123')).to.be.equal('resetPassword.fields.password.min6')
  })
})

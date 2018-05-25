import React from 'react'
import { AuthAPI } from '../../../../services/auth'
import { translate } from '../../../../services/i18n'
import REGISTER from './register.graphql'

import {
  Button,
  Checkbox,
  Flexbox2 as Flexbox,
  FormField,
  Input
} from 'bonde-styleguide'

import { FormGraphQL, Field } from '../../../../components/Form'
import { Link } from '../../../../components'
import { isEmail, isEmpty } from '../../../../services/validations'

class AuthRegister extends React.Component {

  state = { showPassword: false }

  render () {
    const { t } = this.props

    return (
      <FormGraphQL
        mutation={REGISTER}
        onSubmit={(values, mutation) => {
          return mutation({
            variables: { user: { data: JSON.stringify(values) } }
          })
          .then(({ data }) => {
            if (data.register && !data.register.jwtToken) {
              return Promise.reject({ formError: 'register is fail.' })
            }
            AuthAPI.login({ jwtToken: data.register.jwtToken })
            return Promise.resolve()
          })
        }}
      >
        <Flexbox colSize='49.1%' spacing='between'>
          <Field
            name='first_name'
            label={t('fields.firstName.label')}
            placeholder={t('fields.firstName.placeholder')}
            component={FormField}
            inputComponent={Input}
            validate={value => isEmpty(value) && 'Required field'}
          />
          <Field
            name='last_name'
            label={t('fields.lastName.label')}
            placeholder={t('fields.lastName.placeholder')}
            component={FormField}
            inputComponent={Input}
            validate={value => isEmpty(value) && 'Required field'}
          />
        </Flexbox>
        <Field
            name='email'
            label={t('fields.email.label')}
            placeholder={t('fields.email.placeholder')}
            component={FormField}
            inputComponent={Input}
            validate={(value) => {
              if (isEmpty(value)) return 'Required Field'
              else if (!isEmail(value)) return 'Invalid email'
            }}
          />
          <Field
            name='password'
            type={!this.state.showPassword ? 'password' : 'text'}
            placeholder='******'
            label={t('fields.password.label')}
            hint={t('fields.password.hint')}
            component={FormField}
            inputComponent={Input}
            validate={value => {
              if (isEmpty(value)) return 'Required field'
              else if (value.length < 6) return 'Minimun 6 characters'
            }}
          />
        <Flexbox vertical padding='0 0 24px'>
          <Checkbox
            checked={this.state.showPassword}
            onChange={() => this.setState({ showPassword: !this.state.showPassword })}
          >
            {t('links.showPassword')}
          </Checkbox>
          <Checkbox>{t('links.stayConnected')}</Checkbox>
        </Flexbox>
        <Flexbox middle spacing='between'>
          <Link
            to='/auth/login'
            title={t('links.iHaveAccount')}
          >
            <Button flat>{t('links.iHaveAccount')}</Button>
          </Link>
          <Button type='submit'>{t('button.submit')}</Button>
        </Flexbox>
      </FormGraphQL>
    )
  }
}
export default translate('auth')(AuthRegister)

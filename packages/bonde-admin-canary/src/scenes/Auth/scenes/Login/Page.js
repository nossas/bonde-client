import React from 'react'
import { AuthAPI } from '../../../../services/auth'
import { translate } from '../../../../services/i18n'
import AUTHENTICATE from './authenticate.graphql'

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

const AuthLogin = ({ t }) => (
  <FormGraphQL
    mutation={AUTHENTICATE}
    onSubmit={(values, mutation) => {
      return mutation({ variables: values })
        .then(({ data }) => {
          if (data.authenticate && !data.authenticate.jwtToken) {
            return Promise.reject({
              formError: t('form.authError')
            })
          }
          AuthAPI
            .login({ jwtToken: data.authenticate.jwtToken })
          return Promise.resolve()
        })
    }}
  >
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
      type='password'
      placeholder={t('fields.password.placeholder')}
      label={t('fields.password.label')}
      component={FormField}
      inputComponent={Input}
      validate={value => isEmpty(value) && 'Required field'}
    />
    <Flexbox spacing='between' padding='0 0 24px'>
      <Checkbox>{t('links.stayConnected')}</Checkbox>
      <Link
        to='#esqueci-a-senha'
        title={t('links.forgotPassword')}
      >
        {t('links.forgotPassword')}
      </Link>
    </Flexbox>
    <Flexbox middle spacing='between'>
      <Link
        to='/auth/register'
        title={t('links.register')}
      >
        <Button flat>{t('links.register')}</Button>
      </Link>
      <Button type='submit' title={t('button.submit')}>
        {t('button.submit')}
      </Button>
    </Flexbox>
  </FormGraphQL>
)

export default translate('auth')(AuthLogin)

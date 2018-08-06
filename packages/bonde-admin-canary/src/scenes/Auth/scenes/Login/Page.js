import React from 'react'
import { AuthAPI } from 'services/auth'
import { translate } from 'services/i18n'
import AUTHENTICATE from './authenticate.graphql'

import {
  Button,
  // Checkbox,
  Flexbox2 as Flexbox,
  FormField,
  Input,
  Title
} from 'bonde-styleguide'

import { FormGraphQL, Field } from 'components/Form'
import { ButtonLink } from 'components/Link'
import { isEmail, required } from 'services/validations'
import { PasswordField } from '../components'

const AuthLogin = ({ t }) => (
  <React.Fragment>
    <Title.H1 margin={{ bottom: 37 }}>{t('welcome')}</Title.H1>
    <FormGraphQL
      mutation={AUTHENTICATE}
      onSubmit={(values, mutation) => {
        return mutation({ variables: values })
          .then(({ data }) => {
            if (data.authenticate && !data.authenticate.jwtToken) {
              return Promise.reject({
                form: t('form.authError'),
                fields: {
                  email: true,
                  password: true
                }
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
        validate={[
          required(t('fields.email.errors.isEmpty')),
          isEmail(t('fields.email.errors.isEmail'))
        ]}
      />
      <Field
        name='password'
        placeholder={t('fields.password.placeholder')}
        label={t('fields.password.label')}
        component={PasswordField}
        validate={required(t('fields.password.errors.isEmptyLogin'))}
      />
      {/**
        *
        * TODO: Implement "Stay Connected" feature
        *
        <Flexbox spacing='between' padding={{ bottom: 24 }}>
          <Checkbox>{t('links.stayConnected')}</Checkbox>
        </Flexbox>
      */}
      <Flexbox horizontal>
        <ButtonLink
          to='/auth/forget-password'
          title={t('links.forgePassword')}
        >
          {t('links.forgetPassword')}
        </ButtonLink>
      </Flexbox>
      <Flexbox middle spacing='between'>
        <ButtonLink
          to='/auth/register'
          title={t('links.register')}
        >
          {t('links.register')}
        </ButtonLink>
        <Button type='submit' title={t('button.submit')}>
          {t('button.submit')}
        </Button>
      </Flexbox>
    </FormGraphQL>
  </React.Fragment>
)

export default translate('auth')(AuthLogin)

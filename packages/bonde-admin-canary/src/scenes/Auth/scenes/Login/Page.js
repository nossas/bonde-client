/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
import { authSession } from 'services/auth'
import { translate } from 'services/i18n'
import AUTHENTICATE from './authenticate.graphql'
import qs from 'query-string'
import {
  // Checkbox,
  Flexbox2 as Flexbox,
  FormField,
  Input,
  Title
} from 'bonde-styleguide'

import { FormGraphQL, Field, SubmitButton } from 'components/Form'
import { ButtonLink } from 'components/Link'
import { isEmail, required } from 'services/validations'
import { PasswordField } from '../components'
import PropTypes from 'prop-types'

const AuthLogin = ({ t, location }) => (
  <React.Fragment>
    <Title.H1 margin={{ bottom: 37 }}>{t('welcome')}</Title.H1>
    <FormGraphQL
      mutation={AUTHENTICATE}
      onSubmit={(values, mutation) => {
        return mutation({ variables: values })
          .then(({ data }) => {
            if (data.authenticate && !data.authenticate.jwtToken) {
              return Promise.reject({ form: t('form.authError') })
            }
            return authSession
              .login({ jwtToken: data.authenticate.jwtToken })
              .then(() => {
                const search = qs.parse(location.search)
                if (search.next) {
                  window.location.href = search.next
                }
              })
          })
      }}
    >
      <Field
        name='email'
        label={t('fields.email.label')}
        placeholder={t('fields.email.placeholder')}
        component={FormField}
        inputComponent={Input}
        showValid={false}
        validate={[
          required(t('fields.email.errors.isEmpty')),
          isEmail(t('fields.email.errors.isEmail'))
        ]}
      />
      <Field
        name='password'
        placeholder={t('fields.password.placeholder')}
        label={t('fields.password.label')}
        showValid={false}
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
      <Flexbox middle spacing='between'>
        {/**
        *
        * TODO: Account register will be released on future
        <ButtonLink
          to='/auth/register'
          title={t('links.register')}
        >
          {t('links.register')}
        </ButtonLink>
      */}
        <ButtonLink
          to='/auth/forget-password'
          title={t('links.forgePassword')}
        >
          {t('links.forgetPassword')}
        </ButtonLink>
        <SubmitButton title={t('button.submit')}>
          {t('button.submit')}
        </SubmitButton>
      </Flexbox>
    </FormGraphQL>
  </React.Fragment>
)

AuthLogin.propTypes = {
  t: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string
  })
}

export default translate('auth')(AuthLogin)

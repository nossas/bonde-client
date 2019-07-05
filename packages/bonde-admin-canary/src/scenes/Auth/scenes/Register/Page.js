import React from 'react'
import { AuthAPI } from 'services/auth'
import { translate } from 'services/i18n'
import REGISTER from './register.graphql'
import PropTypes from 'prop-types'

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
import { isEmail, required, min } from 'services/validations'
import { PasswordField } from '../components'

const AuthRegister = ({ t }) => (
  <React.Fragment>
    <Title.H1 margin={{ bottom: 37 }}>{t('welcome')}</Title.H1>
    <FormGraphQL
      mutation={REGISTER}
      onSubmit={(values, mutation) => {
        return mutation({
          variables: { user: { data: JSON.stringify(values) } }
        })
          .then(({ data }) => {
            if (data.register && !data.register.jwtToken) {
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject({ form: 'register is fail.' })
            }
            AuthAPI.login({ jwtToken: data.register.jwtToken })
            return Promise.resolve()
          })
          .catch(error => {
            if (String(error).includes('index_users_on_uid_and_provider')) {
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject({
                fields: {
                  email: t('fields.email.errors.isDuplicated')
                }
              })
            }
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
          validate={required(t('fields.firstName.errors.isEmpty'))}
        />
        <Field
          name='last_name'
          label={t('fields.lastName.label')}
          placeholder={t('fields.lastName.placeholder')}
          component={FormField}
          inputComponent={Input}
          validate={required(t('fields.lastName.errors.isEmpty'))}
        />
      </Flexbox>
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
        label={t('fields.password.label')}
        hint={t('fields.password.hint')}
        component={PasswordField}
        validate={[
          required(t('fields.password.errors.isEmptyRegister')),
          min(6, t('fields.password.errors.min'))
        ]}
      />
      {/**
        *
        * TODO: Implement "Stay Connected" feature
        *
        <Flexbox vertical padding='0 0 24px'>
          <Checkbox>{t('links.stayConnected')}</Checkbox>
        </Flexbox>
      */}
      <Flexbox middle spacing='between'>
        <ButtonLink
          to='/auth/login'
          title={t('links.iHaveAccount')}
        >
          {t('links.iHaveAccount')}
        </ButtonLink>
        <Button type='submit'>{t('button.submit')}</Button>
      </Flexbox>
    </FormGraphQL>
  </React.Fragment>
)

AuthRegister.propTypes = {
  t: PropTypes.func
}

export default translate('auth')(AuthRegister)

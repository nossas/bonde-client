//
// @route /community/info
//
import React from 'react'
import { createForm, Field } from '~client/storybook/forms'
import {
  combineValidations,
  required,
  isEmail
} from '~client/storybook/forms/validate'
import {
  SettingsForm,
  TextField,
  UploadField
} from '~client/storybook/settings/forms'
import { asyncEdit } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import { i18nKeys } from './i18n'

const emailErrorMessage = {
  id: 'page--community-info.form.custom-from-email.validation.invalid-email-format',
  defaultMessage: 'E-mail de resposta fora do formato padrão'
}

const CommunityForm = createForm({
  name: 'communityInfoForm',
  fields: [
    'id', 'image', 'name', 'city', 'description', 'email_template_from'
  ],
  initialValues: (state) => ({
    ...CommunitySelectors.getCurrent(state) || {}
  }),
  validate: combineValidations([
    required('name', {
      id: 'page--community-info.form.name.validation.required',
      defaultMessage: 'Informe o nome da comunidade'
    }),
    required('city', {
      id: 'page--community-info.form.city.validation.required',
      defaultMessage: 'Informe em qual cidade sua comunidade atua'
    }),
    required('email_template_from', emailErrorMessage),
    isEmail('email_template_from', emailErrorMessage)
  ]),
  submit: asyncEdit,
  component: SettingsForm
})

export default () => (
  <CommunityForm i18nKeys={i18nKeys}>
    <Field
      name='image'
      signingUrl={`${process.env.API_URL}/uploads`}
      component={UploadField}
    />
    <Field name='name' component={TextField} />
    <Field name='description' component={TextField} />
    <Field name='city' component={TextField} />
    <Field name='email_template_from' component={TextField} />
  </CommunityForm>
)

//
// @route /community/mailchimp
//
// New File
import React from 'react'
import { createForm, Field } from 'storybook/forms'
import {
  SettingsForm,
  TextField
} from 'storybook/settings/forms'
import * as CommunitySelectors from 'community/selectors'
import { asyncEdit } from 'community/action-creators'
import { i18nKeys } from './i18n'
import {
  MailchimpFormWarning,
  MailchimpApiKeyHelp,
  MailchimpListIdHelp
} from './helpText'

const MailchimpForm = createForm({
  name: 'communityMailchimpForm',
  initialValues: (state) => ({
    ...CommunitySelectors.getCurrent(state)
  }),
  fields: ['id', 'mailchimp_api_key', 'mailchimp_list_id'],
  submit: (values, props) => asyncEdit(values),
  component: SettingsForm
})

export default () => (
  <MailchimpForm i18nKeys={i18nKeys}>
    {/* MailchimpFormWarning has a button to resync mailchimp */}
    <MailchimpFormWarning />
    <Field
      name='mailchimp_api_key'
      type='text'
      component={TextField}
      helpTextComponent={MailchimpApiKeyHelp}
    />
    <Field
      name='mailchimp_list_id'
      type='text'
      component={TextField}
      helpTextComponent={MailchimpListIdHelp}
    />
  </MailchimpForm>
)

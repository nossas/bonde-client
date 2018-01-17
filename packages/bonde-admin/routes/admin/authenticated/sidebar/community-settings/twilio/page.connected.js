//
// @route /community/twilio
//
import React from 'react'
import { createForm, Field } from '~client/storybook/forms'
import {
  combineValidations,
  required,
  isPhoneNumber
} from '~client/storybook/forms/validate'
import { SettingsForm, TextField } from '~client/storybook/settings/forms'
// GraphQL
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import * as graphqlMutations from '~client/graphql/mutations'
import * as graphqlQueries from '~client/graphql/queries'
import * as CommunityActions from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
// This module
import {
  TwilioAccountSidHelp,
  TwilioAuthTokenHelp,
  TwilioNumberHelp
} from './helpText'
import { i18nKeys } from './i18n'

const TwilioForm = createForm({
  name: 'communityTwilioForm',
  fields: [
    'twilio_account_sid', 'twilio_auth_token', 'twilio_number'
  ],
  initialValues: (state, ownProps) => ({
    ...ownProps.initialValues
  }),
  validate: combineValidations([
    required(['twilio_account_sid', 'twilio_auth_token', 'twilio_number']),
    isPhoneNumber('twilio_number')
  ]),
  submit: (values, ownProps) => (dispatch) => new Promise((resolve, reject) => {
    const {
      communityId,
      isConfigPreexists,
      addTwilioConfiguration,
      updateTwilioConfiguration
    } = ownProps

    const variables = {
      communityId,
      twilioAccountSid: values.twilio_account_sid,
      twilioAuthToken: values.twilio_auth_token,
      twilioNumber: values.twilio_number
    }

    !isConfigPreexists && addTwilioConfiguration({ variables })
      .then(res => dispatch(CommunityActions.setForcedSubmit(true)))
      .catch(err => {
        console.error('err', err)
        reject(err)
      })

    isConfigPreexists && updateTwilioConfiguration({ variables })
      .then(res => dispatch(CommunityActions.setForcedSubmit(true)))
      .catch(err => {
        console.error('err', err)
        reject(err)
      })

    dispatch({ type: 'graphql/mutations/ADD_TWILIO_CONFIGURATION' })
    return resolve()
  }),
  component: SettingsForm
})

const PageGraphQL = (props) => (
  <TwilioForm i18nKeys={i18nKeys} initialValues={props.initialValues}>
    <Field
      name='twilio_account_sid'
      type='text'
      placeholder='Ex: ACe4________6835_______2277_______'
      component={TextField}
      helpTextComponent={TwilioAccountSidHelp}
    />
    <Field
      name='twilio_auth_token'
      type='text'
      placeholder='Ex: ecd5_______a82c_______b9c9______'
      component={TextField}
      helpTextComponent={TwilioAuthTokenHelp}
    />
    <Field
      name='twilio_number'
      type='text'
      placeholder='Ex: +5511956781234'
      component={TextField}
      helpTextComponent={TwilioNumberHelp}
    />
  </TwilioForm>
)

const HOCGraphQL = Component => connect((state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
}))(
  compose(
    graphql(graphqlMutations.addTwilioConfiguration, { name: 'addTwilioConfiguration' }),
    graphql(graphqlMutations.updateTwilioConfiguration, { name: 'updateTwilioConfiguration' }),
    graphql(graphqlQueries.fetchTwilioConfiguration, {
      options: ({ communityId }) => ({
        fetchPolicy: 'network-only',
        variables: { communityId: communityId }
      }),
      props: ({ ownProps, data: { configs, loading } }) => {
        const [config] = (configs && configs.list) || []
        const isConfigPreexists = !!config
        const initialValues = !config ? {} : {
          twilio_account_sid: config.twilioAccountSid,
          twilio_auth_token: config.twilioAuthToken,
          twilio_number: config.twilioNumber
        }
        // Props passed to mount initialValues and submit action
        return { initialValues, isConfigPreexists }
      }
    })
  )(Component)
)
export default HOCGraphQL(PageGraphQL)

import React, { PropTypes } from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import {
  FormRedux,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  SuccessMessage
} from '~components/forms'
import { FloatLayout } from '~components/grids'
import { SettingsMenu } from '~community/components'

const CommunitySettingsMailchimpPage = ({
  fields: {
    mailchimp_api_key: mailchimpApiKey,
    mailchimp_list_id: mailchimpListId,
    mailchimp_group_id: mailchimpGroupId
  },
  location,
  ...formProps
}) => (
  <SettingsPageLayout>
    <SettingsMenu {...{ location }} />
    <SettingsPageContentLayout>
      <FormRedux nosubmit {...formProps}>
        <FormGroup controlId='apiKeyId' {...mailchimpApiKey}>
          <ControlLabel>Mailchimp API Key</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='listId' {...mailchimpListId}>
          <ControlLabel>Mailchimp ID da lista</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='groupId' {...mailchimpGroupId}>
          <ControlLabel>Mailchimp ID do grupo</ControlLabel>
          <FormControl type='text' />
        </FormGroup>

        <FloatLayout position='floatTopRight'>
          <Button type='submit' className='btn bg-blacker rounded caps white'>
            Salvar
          </Button>
          <SuccessMessage text='Dados editados com sucesso.' />
        </FloatLayout>
      </FormRedux>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

CommunitySettingsMailchimpPage.propTypes = {
  fields: PropTypes.shape({
    mailchimp_api_key: PropTypes.object.isRequired,
    mailchimp_list_id: PropTypes.object.isRequired,
    mailchimp_group_id: PropTypes.object.isRequired
  }).isRequired,
  location: PropTypes.object.isRequired,
  // redux-form required props
  submit: PropTypes.func.isRequired
}

export default CommunitySettingsMailchimpPage

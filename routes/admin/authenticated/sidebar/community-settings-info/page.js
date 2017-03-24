import React, { PropTypes } from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import {
  FormRedux,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField
} from '~client/components/forms'
import { SettingsMenu } from '~client/community/components'
import SettingsForm from '~client/components/settings-form'


const CommunitySettingsInfoPage = ({
  fields: { image, name, city, description },
  location,
  community,
  downloadActivists,
  ...formProps
}) => (
  <SettingsPageLayout>
    <SettingsMenu {...{ location }} />
    <SettingsPageContentLayout>
      <SettingsForm {...formProps}>
        <FormGroup controlId='imageId' {...image}>
          <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
        </FormGroup>
        <FormGroup controlId='nameId' {...name}>
          <ControlLabel>Nome</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='descriptionId' {...description}>
          <ControlLabel>Descrição</ControlLabel>
          <FormControl componentClass='textarea' />
        </FormGroup>
        <FormGroup controlId='cityId' {...city}>
          <ControlLabel>Cidade</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
      </SettingsForm>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

CommunitySettingsInfoPage.propTypes = {
  fields: PropTypes.shape({
    image: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    city: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired
  }),
  location: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default CommunitySettingsInfoPage

import PropTypes from 'prop-types'
import React from 'react'

import {
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  HelpBlock
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'

const CommunitySettingsInfoPage = ({
  fields: {
    image, name, city, description, custom_from_email: customFromEmail
  },
  location,
  community,
  downloadActivists,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <FormGroup controlId='imageId' {...image}>
      <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
    </FormGroup>
    <FormGroup controlId='nametId' {...name}>
      <ControlLabel>Nome</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup controlId='descriptionId' {...description}>
      <ControlLabel>Descrição</ControlLabel>
      <FormControl componentusClass='textarea' />
    </FormGroup>
    <FormGroup controlId='cityId' {...city}>
      <ControlLabel>Cidade</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup controlId='customFromEmail' {...customFromEmail}>
      <ControlLabel>E-mail de resposta para notificações</ControlLabel>
      <HelpBlock>
        {`Você deve preencher seguindo o formato padrão:
          Nome do contato <contato@provedor.com>`}
      </HelpBlock>
      <FormControl type='text' />
    </FormGroup>
  </SettingsForm>
)

CommunitySettingsInfoPage.propTypes = {
  fields: PropTypes.shape({
    image: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    city: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired
  }),
  community: PropTypes.object.isRequired
}

export default CommunitySettingsInfoPage

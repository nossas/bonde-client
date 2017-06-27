import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'

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
    image, name, city, description, email_template_from: customFromEmail
  },
  location,
  community,
  downloadActivists,
  intl,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <FormGroup controlId='imageId' {...image}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-info.form.logo.label'
          defaultMessage='Logo'
        />
      </ControlLabel>
      <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
    </FormGroup>
    <FormGroup controlId='nametId' {...name}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-info.form.name.label'
          defaultMessage='Nome'
        />
      </ControlLabel>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-info.form.name.placeholder',
          defaultMessage: 'Insira o nome da sua comunidade'
        })}
      />
    </FormGroup>
    <FormGroup controlId='descriptionId' {...description}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-info.form.description.label'
          defaultMessage='Descrição'
        />
      </ControlLabel>
      <FormControl
        componentClass='textarea'
        placeholder={intl.formatMessage({
          id: 'page--community-info.form.description.placeholder',
          defaultMessage: 'Insira uma descrição para a sua comunidade'
        })}
      />
    </FormGroup>
    <FormGroup controlId='cityId' {...city}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-info.form.city.label'
          defaultMessage='Cidade'
        />
      </ControlLabel>
      <FormControl type='text' />
    </FormGroup>
    <FormGroup controlId='customFromEmail' {...customFromEmail}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-info.form.custom-from-email.label'
          defaultMessage='E-mail de resposta para notificações'
        />
      </ControlLabel>
      <HelpBlock>
        <FormattedMessage
          id='page--community-info.form.custom-from-email.helper-text'
          defaultMessage='Esse email é utilizado como remetente padrão das notificações.'
        />
      </HelpBlock>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-info.form.custom-from-email.placeholder',
          defaultMessage: 'Ex: Nome do remetente <remetente@provedor.com>'
        })}
      />
    </FormGroup>
  </SettingsForm>
)

CommunitySettingsInfoPage.propTypes = {
  fields: PropTypes.shape({
    image: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    city: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired,
    email_template_from: PropTypes.object
  }),
  community: PropTypes.object.isRequired,
  intl: intlShape.isRequired
}

export default CommunitySettingsInfoPage

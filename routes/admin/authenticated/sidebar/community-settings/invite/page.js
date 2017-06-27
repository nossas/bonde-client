import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'

import {
  FormRedux,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  HelpBlock
} from '~client/components/forms'
import { Info } from '~client/components/notify'
import { SettingsForm } from '~client/ux/components'
import Button from '~client/ux/components/button'

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

const CommunitySettingsInfoPage = ({
  fields: { email },
  resetForm,
  location,
  community,
  downloadActivists,
  intl,
  ...formProps
}) => (
  <FormRedux
    {...formProps}
    nosubmit
    onFinishSubmit={() => resetForm()}
  >
    <Info
      title={
        <FormattedMessage
          id='page--community-invite.info.title'
          defaultMessage='Informação'
        />
      }
    >
      <FormattedMessage
        id='page--community-invite.info.content.first-line'
        defaultMessage={
          'Convide novos usuários para fazerem parte da sua comunidade, eles terão ' +
          'acesso as mesmas informações que o você possui.'
        }
      />
      <br />
      <FormattedMessage
        id='page--community-invite.info.content.second-line'
        defaultMessage='Utilizando o formulário abaixo, você envia o convite por e-mail.'
      />
    </Info>

    <FormGroup controlId='email' {...email}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-invite.form.email.label'
          defaultMessage='Email'
        />
      </ControlLabel>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-invite.form.email.placeholder',
          defaultMessage: 'Insira um email para convidar. Ex: mobilizador@email.com'
        })}
        containerClassName={styles.inlineFormControlContainer}
        content={(
          <span className={styles.buttonWrapper}>
            <Button type='submit'>
              <FormattedMessage
                id='page--community-invite.form.submit-button.default'
                defaultMessage='Convidar'
              />
            </Button>
          </span>
        )}
      />
    </FormGroup>
  </FormRedux>
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

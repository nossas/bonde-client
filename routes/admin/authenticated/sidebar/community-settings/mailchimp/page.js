import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { Info, Warning } from '~client/components/notify'

const CommunitySettingsMailchimpPage = ({
  fields: {
    mailchimp_api_key: mailchimpApiKey,
    mailchimp_list_id: mailchimpListId
  },
  location,
  intl,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <Warning
      title={
        <FormattedMessage
          id='page--community-mailchimp.warning.title'
          defaultMessage='Atenção'
        />
      }
    >
      <FormattedMessage
        id='page--community-mailchimp.warning.content.first-line'
        defaultMessage={
          'Configure a integração com o mailchimp para que seja possível a criação ' +
          'de segmentos dos usuários que interagiram com o sua mobilização nele.'
        }
      />
      <br />
      <FormattedMessage
        id='page--community-mailchimp.warning.content.second-line'
        defaultMessage={
          'Adotamos o seguinte padrão no nome dos segmentos: ' +
          'M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)'
        }
      />
    </Warning>

    <FormGroup controlId='apiKeyId' {...mailchimpApiKey}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-mailchimp.form.api-key.label'
          defaultMessage='Mailchimp API Key'
        />
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-mailchimp.form.api-key.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <br />
        <ol>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.api-key.helper-text.step-01'
              defaultMessage={
                'Após fazer o login como administrador no mailchimp, ' +
                'clique no seu nome de usuário. Surgirá um menu, clique na opção {accountStrong}.'
              }
              values={{ accountStrong: <b>account</b> }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.api-key.helper-text.step-02'
              defaultMessage={
                'Siga os passos: {extrasStrong} > {apiKeysStrong} > ' +
                '{yourApiKeysStrong} > {createKeyStrong}'
              }
              values={{
                extrasStrong: <b>Extras</b>,
                apiKeysStrong: <b>API keys</b>,
                yourApiKeysStrong: <b>Your API keys</b>,
                createKeyStrong: <b>Create a Key</b>
              }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.api-key.helper-text.step-03'
              defaultMessage='Agora é só colar no campo abaixo o conteúdo de {apiKeyStrong}.'
              values={{ apiKeyStrong: <b>API key</b> }}
            />
          </li>
        </ol>
      </HelpBlock>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-mailchimp.form.api-key.placeholder',
          defaultMessage: 'Insira aqui o conteúdo de "API key"'
        })}
      />
    </FormGroup>

    <FormGroup controlId='listId' {...mailchimpListId}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-mailchimp.form.list-id.label'
          defaultMessage='Mailchimp ID da lista'
        />
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-mailchimp.form.list-id.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <ol>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.list-id.helper-text.step-01'
              defaultMessage={
                'Após fazer o login como administrador no mailchimp, clique no seu ' +
                'nome de usuário. Surgirá um menu, clique na opção {listStrong}.'
              }
              values={{ listStrong: <b>List</b> }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.list-id.helper-text.step-02'
              defaultMessage={
                'Selecione a lista correspondente e siga os passos: ' +
                '{settingsStrong} > {listAndDefaultsStrong}'
              }
              values={{
                settingsStrong: <b>Settings</b>,
                listAndDefaultsStrong: <b>Lists and Defaults</b>
              }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.list-id.helper-text.step-03'
              defaultMessage={
                'Agora é só colar no campo abaixo o conteúdo da coluna a direita, ' +
                'abaixo do título {listIdStrong}'
              }
              values={{
                listIdStrong: <b>LIST ID</b>
              }}
            />
          </li>
        </ol>
      </HelpBlock>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-mailchimp.form.list-id.placeholder',
          defaultMessage: 'Insira aqui o "ID da lista"'
        })}
      />
    </FormGroup>
  </SettingsForm>
)

CommunitySettingsMailchimpPage.propTypes = {
  fields: PropTypes.shape({
    mailchimp_api_key: PropTypes.object.isRequired,
    mailchimp_list_id: PropTypes.object.isRequired,
  }).isRequired,
  // redux-form required props
  submit: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default CommunitySettingsMailchimpPage

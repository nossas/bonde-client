import React from 'react'
import PropTypes from 'prop-types'
import { Raw } from 'slate'
import { FormattedMessage, intlShape } from 'react-intl'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import EditorSlate, {
  createEditorContent
} from '~client/mobilizations/widgets/__plugins__/content/components/editor-slate'

class EditorInput extends React.Component {

  render () {
    const { $formGroup: { value, onChange } } = this.context
   
    return (
      <EditorSlate
        content={value || ''}
        btnSaveLabel={this.props.buttonText}
        handleSave={(state) => {
          const raw = JSON.stringify(Raw.serialize(state))
          if (value !== raw) onChange(raw)
        }}
        staticToolbar={true}
        contentStyles={{
          backgroundColor: '#fff',
          color: '#666',
          padding: 10,
          border: '1px solid #eee',
          borderRadius: '2px'
        }}
      />
    )
  }
}

EditorInput.contextTypes = {
  $formGroup: PropTypes.object
}

const Page = ({
  fields: { name, subject, sender, content },
  intl,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <FormGroup controlId='nameId' {...name}>
      <ControlLabel>
        <FormattedMessage
          id='page--communication.form.name.label'
          defaultMessage='Nome da campanha'
        />
      </ControlLabel>
      <FormControl
        placeholder={intl.formatMessage({
          id: 'page--communication.form.name.placeholder',
          defaultMessage: 'Pela criação de uma delegacia de desaparecidos'
        })}
      />
    </FormGroup>
    <FormGroup controlId='subjectId' {...subject}>
      <ControlLabel maxLength={140}>
        <FormattedMessage
          id='page--communication.form.subject.label'
          defaultMessage='Assunto do email'
        />
      </ControlLabel>
      <FormControl
        placeholder={intl.formatMessage({
          id: 'page--communication.form.subject.placeholder',
          defaultMessage: 'Faça um texto curto capaz'+
          ' de motivar outras pessoas a se unirem a sua'
        })}
      />
    </FormGroup>
    <FormGroup controlId='senderId' {...sender}>
      <ControlLabel>
        <FormattedMessage
          id='page--communication.form.sender.label'
          defaultMessage='Remetente'
        />
      </ControlLabel>
      <FormControl
        placeholder={intl.formatMessage({
          id: 'page--communication.form.sender.placeholder',
          defaultMessage: 'Remetente'
        })}
      />
      <HelpBlock>{'Ex.: Nome <email@provedor.com>'}</HelpBlock>
    </FormGroup>
    <FormGroup controlId='contentId' {...content}>
      <EditorInput
        buttonText={intl.formatMessage({
          id: 'page--communication.form.content.draft-button',
          defaultMessage: 'Salvar rascunho'
        })}
      />
    </FormGroup>
  </SettingsForm>
)

Page.propTypes = {
  intl: intlShape.isRequired
}

export default Page

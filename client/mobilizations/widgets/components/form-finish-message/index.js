import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form'
import { Raw } from 'slate'

// Global module dependencies
import {
  FormGroup,
  RadioGroup,
  Radio,
  ControlLabel,
  FormControl
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import Editor from '~client/components/editor-draft-js'
import EditorSlate, {
  createEditorContent
} from '~client/mobilizations/widgets/__plugins__/content/components/editor-slate'

// Current module dependencies
import * as styles from './index-scss'

export const FormFinishMessage = props => {
  const { mobilization, fields, successMessage, widget, ...formProps } = props
  const { color_scheme: colorScheme } = mobilization
  const { TellAFriend } = props

  const {
    finish_message_type: finishMessageType,
    finish_message: finishMessage,
    whatsapp_text: whatsappText
  } = fields

  let parsedFinishMessage
  try {
    parsedFinishMessage = JSON.parse(finishMessage.value)
  } catch (e) {
    parsedFinishMessage = finishMessage.value
  }

  return (
    <SettingsForm
      {...formProps}
      onSubmit={values => {
        return props.asyncWidgetUpdate({
          ...widget,
          settings: { ...widget.settings, ...values }
        })
      }}
      successMessage={successMessage || 'Formulário salvo com sucesso!'}
    >
      <FormGroup controlId='payment-type-id' {...finishMessageType}>
        <ControlLabel>Tipo de mensagem</ControlLabel>
        <RadioGroup>
          <Radio value='share'>Compartilhar</Radio>
          <Radio value='custom'>Customizar</Radio>
        </RadioGroup>
      </FormGroup>

      {finishMessageType.value === 'share' && (
        <div>
          <FormGroup controlId='whatsapp-text-id' {...whatsappText}>
            <ControlLabel>
              <i className='fa fa-whatsapp mr2' style={styles.whatsappControlLabel} />
              Texto do WhatsApp
            </ControlLabel>
            <FormControl
              rows='4'
              componentClass='textarea'
              placeholder={'Faça um texto curto, capaz de motivar outras pessoas a se unirem à' +
                ' sua mobilização. Você poderá alterar este texto depois.'}
            />
          </FormGroup>
        </div>
      )}

      <label className='h5 darkengray caps mb1 block'>Preview</label>
      {finishMessageType.value === 'share' && (
        <TellAFriend preview mobilization={mobilization} widget={widget} />
      )}
      {finishMessageType.value === 'custom' && (
        <div className='widget-finish-message-custom'>
          <div className='relative'>
            <input type='hidden' name='finish_message' />
            <input type='hidden' name='finish_message_background' />
            {parsedFinishMessage.constructor === Object && parsedFinishMessage.entityMap ? (
              <Editor
                value={parsedFinishMessage}
                theme={colorScheme.replace('-scheme', '')}
                toolbarContainerStyle={styles.editorToolbarContainer}
                toolbarStyle={styles.editorToolbar}
                containerStyle={styles.editorContainer}
                focusStyle={styles.editorFocus}
                editorStyle={styles.editor}
                handleSave={rawContent => { finishMessage.onChange(JSON.stringify(rawContent)) }}
              />
            ) : (
              <EditorSlate
                content={finishMessage.value}
                handleSave={state => {
                  const raw = JSON.stringify(Raw.serialize(state))
                  if (finishMessage.value !== raw) finishMessage.onChange(raw)
                }}
                toolbarStyles={{ position: 'relative', marginBottom: 10 }}
                contentStyles={{ backgroundColor: '#fff', color: '#666', padding: 10 }}
              />
            )}
          </div>
        </div>
      )}
    </SettingsForm>
  )
}

// Redux Form configurations
const fields = [
  'finish_message_type',
  'finish_message',
  'finish_message_background',
  'whatsapp_text'
]

const validate = values => {
  const errors = {}
  if (!values.finish_message_type) {
    errors.finish_message_type = 'Nenhum tipo de mensagem foi selecionado'
  }
  return errors
}

const mapStateToProps = (state, props) => {
  const settings = props.widget.settings || {}
  return {
    initialValues: {
      finish_message_type: settings.finish_message_type || 'share',
      finish_message: settings.finish_message || createEditorContent('Clique aqui para editar...'),
      finish_message_background: settings.finish_message_background || '255,255,255,1',
      whatsapp_text: settings.whatsapp_text || ''
    }
  }
}

//
// PropTypes
//
FormFinishMessage.propTypes = {
  // Injected components
  TellAFriend: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  // Form Redux
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  successMessage: PropTypes.string,
  // Injected by components
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default reduxForm(
  { form: 'formFinishMessage', fields, validate },
  mapStateToProps
)(FormFinishMessage)

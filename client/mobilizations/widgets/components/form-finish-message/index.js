import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Raw } from 'slate'

// Global module dependencies
import {
  FormRedux,
  FormGroup,
  RadioGroup,
  Radio,
  ControlLabel
} from '~components/forms'
import Editor from '~components/editor-draft-js'
import EditorSlate, {
  createEditorContent
} from '~client/mobilizations/widgets/__plugins__/content/components/editor-slate'

// Current module dependencies
import * as styles from './index-scss'

export const FormFinishMessage = props => {
  const { mobilization, fields, successMessage, ...rest } = props
  const { color_scheme: colorScheme } = mobilization
  const { TellAFriend } = props

  const {
    finish_message_type: finishMessageType,
    finish_message: finishMessage
  } = fields

  const parsedFinishMessage = editorValue(finishMessage.value)

  return (
    <FormRedux
      {...rest}
      className='transparent'
      floatButton='Salvar'
      onSubmit={onSubmit(props)}
      successMessage={successMessage || 'Formulário salvo com sucesso!'}
    >
      <FormGroup controlId='payment-type-id' {...finishMessageType}>
        <ControlLabel>Tipo de mensagem</ControlLabel>
        <RadioGroup>
          <Radio value='share'>Compartilhar</Radio>
          <Radio value='custom'>Customizar</Radio>
        </RadioGroup>
      </FormGroup>

      <label className='h5 darkengray caps mb1 block'>Preview</label>
      {finishMessageType.value === 'share' && (
        <TellAFriend preview mobilization={mobilization} />
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
                contentStyles={{ border: '1px solid #e1e1e1', color: '#666', padding: 10 }}
              />
            )}
          </div>
        </div>
      )}
    </FormRedux>
  )
}

//
// Helper functions
//
const onSubmit = props => values => {
  const { asyncWidgetUpdate, widget } = props
  return asyncWidgetUpdate({
    ...widget,
    settings: { ...widget.settings, ...values }
  })
}

const editorValue = message => {
  try {
    return JSON.parse(message)
  } catch (e) {
    return message
  }
}

//
// Redux Form configurations
//
const fields = [
  'finish_message_type',
  'finish_message',
  'finish_message_background'
]

const validate = values => {
  const errors = {}
  if (!values.finish_message_type) {
    errors.finish_message_type = 'Nenhum tipo de mensagem foi selecionado'
  }
  return errors
}

const mapStateToProps = (state, { widget: { settings } }) => ({
  initialValues: {
    finish_message_type: settings.finish_message_type || 'share',
    finish_message: settings.finish_message || createEditorContent('Clique aqui para editar...'),
    finish_message_background: settings.finish_message_background || '255,255,255,1'
  }
})

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

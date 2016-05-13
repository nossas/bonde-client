import React, { PropTypes } from 'react'
import classnames from 'classnames'
import * as Paths from '../Paths'
import { Label, FormWidgetMenu, DonationWidgetMenu, Loading, CloseButton } from './../components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import reduxForm from 'redux-form'

function widgetFormValidation(data) {
  const errors = { valid: true }
  if (data.id && !/(UA|YT|MO)-\d+-\d+/i.test(data.id)) {
    errors.id = 'Informe uma ID válida'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.widgetForm }))
@reduxForm('widgetForm', widgetFormValidation)
export default class AutoFireForm extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      hasSubmitted: false,
      error: null
    }
    this.props.initializeForm({senderName: null, senderEmail: null, emailSubject: null, emailText: null })
  }

  componentWillReceiveProps(nextProps) {
    const widget = this.widget(nextProps)
    if (widget) {
      if (this.state.initializing) {
        const { sender_name: senderName, sender_email: senderEmail, email_subject: emailSubject, email_text: emailText } = (widget.settings || {sender_name: null, sender_email: null, email_subject: null, email_text: null })
        this.props.initializeForm({senderName, senderEmail, emailSubject, emailText })
        this.setState({initializing: false})
      }
      this.state.submitting && this.setState({submitting: false})
      this.state.submitting && this.setState({hasSubmitted: true})
    }
  }

  widget (props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString() }).indexOf(this.props.params.widget_id)]
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  handleSubmit(event) {
    event.preventDefault()
    const widget = this.widget()
    const { settings } = widget
    const { data, touchAll, valid, dispatch, mobilization, auth } = this.props
    this.setState({ submitting: true, hasSubmitted: false, error: null })
    if (valid) {
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      bindedWidgetActions.editWidget({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          ...settings,
          sender_name: data.senderName,
          sender_email: data.senderEmail,
          email_subject: data.emailSubject,
          email_text: data.emailText
        } }
      })
      this.props.initializeForm({senderName: data.senderName, senderEmail: data.senderEmail, emailText: data.emailText, emailSubject: data.emailSubject })
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  renderErrorMessage() {
    if (this.state.error) {
      return (
        <div className="red center mt2">{this.state.error}</div>
      )
    }
  }

  renderForm () {
    const {
      data: { senderName, senderEmail, emailText, emailSubject },
      errors: { senderName: senderNameError, senderEmail: senderEmailError, emailText: emailTextError, emailSubject: emailSubjectError },
      touched: { senderName: senderNameTouched, senderEmail: senderEmailTouched, emailText: emailTextTouched, emailSubject: emailSubjectTouched },
      handleChange,
      handleBlur,
      dirty
    } = this.props

    return (
      <form onSubmit={::this.handleSubmit}>
        <Label htmlFor="buttonText">Nome do remetente</Label>
        {senderNameError && senderNameTouched && <span className="red ml2">{senderNameError}</span>}
        <input
          id="senderName"
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Ex: João do Minha Sampa"
          style={{height: '48px'}}
          value={senderName}
          onChange={handleChange('senderName')}
          onBlur={handleBlur('senderName')} />

        <Label htmlFor="buttonText">E-mail do remetente</Label>
        {senderEmailError && senderEmailTouched && <span className="red ml2">{senderEmailError}</span>}
        <input
          id="senderEmail"
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Ex: joao@minhasampa.org.br"
          style={{height: '48px'}}
          value={senderEmail}
          onChange={handleChange('senderEmail')}
          onBlur={handleBlur('senderEmail')} />

        <Label htmlFor="buttonText">Assunto do e-mail</Label>
        {emailSubjectError && emailSubjectTouched && <span className="red ml2">{emailSubjectError}</span>}
        <input
          id="emailSubject"
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Ex: Por uma nova cidade"
          style={{height: '48px'}}
          value={emailSubject}
          onChange={handleChange('emailSubject')}
          onBlur={handleBlur('emailSubject')} />

        <Label htmlFor="emailText">Email de agradecimento</Label>
        {emailTextError && emailTextTouched && <span className="red ml2">{emailTextError}</span>}
        <textarea
          id="emailText"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Ex: Obrigado por apostar na força da ação coletiva em rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um dos links abaixo. Um abraço."
          rows={5}
          value={emailText}
          onChange={handleChange('emailText')}
          onBlur={handleBlur('emailText')} />
        <div className="clearfix">
          <input
            type="submit"
            className={classnames('caps button bg-aqua h3 mt1')}
            disabled={this.state.submitting || (!dirty)}
            value={this.state.submitting ? 'Salvando...' : 'Salvar'} />
        </div>

        {::this.renderErrorMessage()}
        { this.state.hasSubmitted && !dirty &&
        <div className="green mt2">Configurações do formulário atualizadas!</div> }
      </form>
    )
  }

  renderPage () {
    const { widgets, dirty } = this.props
    const widget = this.widget()
    return (
      <div className='flex-auto flex flex-column bg-silver gray relative'>
        {(widget.kind === 'donation'
          ? <DonationWidgetMenu {...this.props} widget={widget} />
          : <FormWidgetMenu {...this.props} widget={widget} />
        )}
        <div className='p3 flex-auto overflow-scroll'>
          { !this.state.initializing && this.renderForm() }
        </div>
        <CloseButton dirty={dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }

  renderLoading () {
    return (
      <Loading />
    )
  }

  render () {
    return (this.props.widgets.data.length > 0 ? this.renderPage() : this.renderLoading())
  }
}

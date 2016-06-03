import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import * as Paths from '../Paths'
import { DonationWidgetMenu, Loading, CloseButton, Label} from './../components'
import reduxForm from 'redux-form'
import ColorPicker from 'react-color'
import download from './../actions/ForceDownload'

function widgetFormValidation(data) {
  const errors = { valid: true }

  if (!data.button_text) {
    errors.buttonText = 'Insira o texto do botão'
    errors.valid = false
  } else if (data.button_text.length > 50) {
    errors.buttonText = 'O limite de caracteres foi atingido.'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.widgetForm }))
@reduxForm('widgetForm', widgetFormValidation)
export default class DonationWidgetSettings extends React.Component {
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

  constructor(props, context) {
    super(props, context)

    this.state = {
      initializing: true,
      submitting: false,
      hasSubmitted: false,
      error: null,
      displayColorPicker: false,
      selectedColorPicker: '#ffffff'
    }

    this.handleColorClick = this.handleColorClick.bind(this)
    this.handleToggleColorPickerClick = this.handleToggleColorPickerClick.bind(this)

    this.props.initializeForm({
      title_text: '',
      button_text: '',
      main_color: '#ffffff',
      donation_value1: '',
      donation_value2: '',
      donation_value3: '',
      donation_value4: '',
      donation_value5: '',
      payment_methods: 'false',
      customer_data: 'true'})
  }

  componentWillReceiveProps(nextProps) {
    const widget = this.widget(nextProps)

    if (widget) {
      if (this.state.initializing) {
        const {
          title_text,
          button_text,
          main_color,
          donation_value1,
          donation_value2,
          donation_value3,
          donation_value4,
          donation_value5,
          payment_methods,
          customer_data
        } = (widget.settings || {
          title_text: '',
          button_text: '',
          main_color: '#ffffff',
          donation_value1: '',
          donation_value2: '',
          donation_value3: '',
          donation_value4: '',
          donation_value5: '',
          payment_methods: 'false',
          customer_data: 'true'
        })
        this.props.initializeForm({
          title_text,
          button_text,
          main_color,
          donation_value1,
          donation_value2,
          donation_value3,
          donation_value4,
          donation_value5,
          payment_methods,
          customer_data
        })
        this.setState({initializing: false, selectedColorPicker: main_color})
      }
      this.state.submitting && this.setState({submitting: false})
      this.state.submitting && this.setState({hasSubmitted: true})
    }
  }

  widget(props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
  }

  handleCancelClick(event) {
    event.preventDefault()
    Paths.editMobilization(this.props.mobilization.id)
  }

  handleDownloadClick(event) {
    event.preventDefault()
    download("hello world", "dlText.txt", "text/plain");
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
          title_text: data.title_text,
          button_text: data.button_text,
          main_color: data.main_color,
          donation_value1: data.donation_value1,
          donation_value2: data.donation_value2,
          donation_value3: data.donation_value3,
          donation_value4: data.donation_value4,
          donation_value5: data.donation_value5,
          payment_methods: data.payment_methods,
          customer_data: data.customer_data
        } }
      })
      this.props.initializeForm({
        title_text: data.title_text,
        button_text: data.button_text,
        main_color: data.main_color,
        donation_value1: data.donation_value1,
        donation_value2: data.donation_value2,
        donation_value3: data.donation_value3,
        donation_value4: data.donation_value4,
        donation_value5: data.donation_value5,
        payment_methods: data.payment_methods,
        customer_data: data.customer_data
      })
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

  handleToggleColorPickerClick(e) {
    e.preventDefault()
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleColorClick(color) {
    this.setState({ selectedColorPicker: '#' + color.hex })
  }

  renderButtonTextLength() {
    const { data: { button_text } } = this.props
    if (button_text && button_text.length > 0) {
      return(
        <small className={classnames('ml2 italic', (button_text.length > 40 ? 'red' : null))}>{50 - button_text.length} caracteres restantes</small>
      )
    }
  }

  renderForm() {
    const {
      data: {
        title_text,
        button_text,
        donation_value1,
        donation_value2,
        donation_value3,
        donation_value4,
        donation_value5,
        payment_methods,
        customer_data
      },
      errors: { callToAction: callToActionError, buttonText: buttonTextError },
      touched: { callToAction: callToActionTouched, buttonText: buttonTextTouched },
      handleChange,
      handleBlur,
      dirty
    } = this.props

    const widget = this.widget()

    const {
      displayColorPicker,
      selectedColorPicker
    } = this.state
    //           <button className="inline-block" onClick={this.handleToggleColorPickerClick}>Pick Color</button>
    return (
      <form onSubmit={::this.handleSubmit}>
        <Label htmlFor="title_text">Título do bloco de doação</Label>
        {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
        <input
          id="title_text"
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Ex.: Escolha um valor e contribua agora!"
          style={{height: '48px'}}
          value={title_text}
          onChange={handleChange('title_text')}
          onBlur={handleBlur('title_text')} />

        <div className="clearfix full-width meurio-scheme mb3">
          <Label htmlFor="main_color">Defina a cor da página de pagamento</Label>
          <div className="clearfix"></div>
          {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
          <input
            id="main_color"
            type="text"
            className="field-light inline-block h3 mt1"
            value={selectedColorPicker}
            style={{height: '48px'}}
            onChange={handleChange('main_color')}
            onBlur={handleBlur('main_color')} />
          <ColorPicker
            color={selectedColorPicker}
            display={ displayColorPicker }
            onClose={ this.handleClose }
            onChange={handleChange('main_color')}
            onChangeComplete={this.handleColorClick}
            type="sketch" />
        </div>

        <div className="clearfix">
          <Label>Defina os valores para o bloco de doação</Label>
          <p><small className="muted"><em>Você pode ter até 5 valores por bloco de doação. Preencha apenas com números inteiros (Ex: 50)</em></small></p>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value1">Valor 1</Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value1"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="R$20"
              style={{height: '48px', width: '90%'}}
              value={donation_value1}
              onChange={handleChange('donation_value1')}
              onBlur={handleBlur('donation_value1')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value2">Valor 2</Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value2"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="R$50"
              style={{height: '48px', width: '90%'}}
              value={donation_value2}
              onChange={handleChange('donation_value2')}
              onBlur={handleBlur('donation_value2')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value3">Valor 3</Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value3"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="R$100"
              style={{height: '48px', width: '90%'}}
              value={donation_value3}
              onChange={handleChange('donation_value3')}
              onBlur={handleBlur('donation_value3')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value4">Valor 4</Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value4"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="R$200"
              style={{height: '48px', width: '90%'}}
              value={donation_value4}
              onChange={handleChange('donation_value4')}
              onBlur={handleBlur('donation_value4')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value5">Valor 5</Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value5"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="R$500"
              style={{height: '48px', width: '90%'}}
              value={donation_value5}
              onChange={handleChange('donation_value5')}
              onBlur={handleBlur('donation_value5')} />
          </div>
          <div className="sm-col sm-col-2 bold">
            <small className="muted">*todos os valores são em reais</small>
          </div>
        </div>
        <div className="sm-col sm-col-10">
          <Label htmlFor="button_text">Texto do botão de doação</Label>
          { this.renderButtonTextLength() }
          {buttonTextError && buttonTextTouched && <span className="red ml2">{buttonTextError}</span>}
          <input
            id="button_text"
            type="text"
            className="field-light block h3 half-width mt1 mb3"
            placeholder="Ex.: Doe agora!"
            style={{height: '48px'}}
            value={button_text}
            onChange={handleChange('button_text')}
            onBlur={handleBlur('button_text')} />
        </div>
        <div className="sm-col sm-col-10">
          <Label htmlFor="payment_methods">Habilitar pagamento por boleto?</Label>
          {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
          <p><small className="muted"><em>Cada boleto pago terá um custo adicional de R$3,00</em></small></p>
          <p className=" mt1 mb3">
            <input
              name="payment_methods"
              type="radio"
              value="true"
              checked={payment_methods == 'true'}
              onChange={handleChange('payment_methods')}
              onBlur={handleBlur('payment_methods')} />
            Sim&nbsp;&nbsp;
            <input
              name="payment_methods"
              type="radio"
              checked={payment_methods == 'false'}
              value="false"
              onChange={handleChange('payment_methods')} />
            Não
          </p>

          <Label htmlFor="payment_methods">conta bancária</Label>
          <p className="mb3"><em>Este bloco de doação está associado à conta correspondente da cidade no Pagar.me.</em></p>

          <Label htmlFor="payment_methods">Relatório de doações</Label>
          <p  className="mb3"><a href="#" onClick={::this.handleDownloadClick}>Clique para baixar a planilha completa.</a></p>
        </div>
        <div className="sm-col sm-col-10">
          <button
            className="caps button bg-darken-3 h3 mt1 mr2"
            disabled={this.state.submitting}
            onClick={::this.handleCancelClick}>
            Cancelar
          </button>
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

  renderPage() {
    const { widgets, dirty } = this.props
    const widget = this.widget()
    return (
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <DonationWidgetMenu {...this.props} widget={widget} />
        <div className="p3 flex-auto overflow-scroll">
          { !this.state.initializing && this.renderForm() }
        </div>
        <CloseButton dirty={dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  render() {
    return (this.props.widgets.data.length > 0 ? this.renderPage() : this.renderLoading())
  }
}

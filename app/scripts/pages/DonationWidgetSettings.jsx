import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import * as Paths from '../Paths'
import { DonationWidgetMenu, Loading, CloseButton, Label} from './../components'
import reduxForm from 'redux-form'
import ColorPicker from 'react-color';

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
      selectedColorPicker: '#54d0f6'
    }

    this.handleColorClick = this.handleColorClick.bind(this)

    this.props.initializeForm({
      title_text: '',
      button_text: '',
      main_color: '#54d0f6',
      default_donation_value: 1,
      donation_value1: '',
      donation_value2: '',
      donation_value3: '',
      donation_value4: '',
      donation_value5: '',
      recurring_period: 30,
      payment_type: 'unique',
      payment_methods: 'false'})
  }

  componentWillReceiveProps(nextProps) {
    const widget = this.widget(nextProps)

    if (widget) {
      if (this.state.initializing) {
        const {
          title_text,
          button_text,
          main_color,
          default_donation_value,
          donation_value1,
          donation_value2,
          donation_value3,
          donation_value4,
          donation_value5,
          recurring_period,
          payment_type,
          payment_methods
        } = (widget.settings || {
          title_text: '',
          button_text: '',
          main_color: '#54d0f6',
          default_donation_value: 1,
          donation_value1: '',
          donation_value2: '',
          donation_value3: '',
          donation_value4: '',
          donation_value5: '',
          recurring_period: 30,
          payment_type: 'unique',
          payment_methods: 'false'
        })
        this.setState({initializing: false, selectedColorPicker: main_color})
        this.props.initializeForm({
          title_text,
          button_text,
          main_color,
          default_donation_value,
          donation_value1,
          donation_value2,
          donation_value3,
          donation_value4,
          donation_value5,
          recurring_period,
          payment_type,
          payment_methods
        })
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

  handleSubmit(event) {
    event.preventDefault()
    const widget = this.widget()
    const { settings } = widget
    const { data, touchAll, valid, dispatch, mobilization, auth } = this.props
    const { selectedColorPicker } = this.state
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
          main_color: selectedColorPicker,
          default_donation_value: data.default_donation_value,
          donation_value1: data.donation_value1,
          donation_value2: data.donation_value2,
          donation_value3: data.donation_value3,
          donation_value4: data.donation_value4,
          donation_value5: data.donation_value5,
          recurring_period: data.recurring_period,
          payment_type: data.payment_type,
          payment_methods: data.payment_methods
        } }
      })
      this.props.initializeForm({
        title_text: data.title_text,
        button_text: data.button_text,
        main_color: data.main_color,
        default_donation_value: data.default_donation_value,
        donation_value1: data.donation_value1,
        donation_value2: data.donation_value2,
        donation_value3: data.donation_value3,
        donation_value4: data.donation_value4,
        donation_value5: data.donation_value5,
        recurring_period: data.recurring_period,
        payment_type: data.payment_type,
        payment_methods: data.payment_methods
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

  handleColorClick(color) {
    this.setState({selectedColorPicker: '#' + color.hex})
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
        main_color,
        default_donation_value,
        donation_value1,
        donation_value2,
        donation_value3,
        donation_value4,
        donation_value5,
        recurring_period,
        payment_methods,
        payment_type
      },
      errors: { callToAction: callToActionError, buttonText: buttonTextError },
      touched: { callToAction: callToActionTouched, buttonText: buttonTextTouched },
      handleChange,
      handleBlur,
      dirty
    } = this.props

    const {
      selectedColorPicker
    } = this.state

    return (
      <form onSubmit={::this.handleSubmit}>
        <div className="sm-col sm-col-12">
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

          <Label htmlFor="payment_type">Tipo de doação</Label>
          {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
          <p className=" mt1 mb3">
            <input
              name="payment_type"
              type="radio"
              value="unique"
              checked={payment_type == 'unique'}
              onChange={handleChange('payment_type')}
              onBlur={handleBlur('payment_type')} />
            Única&nbsp;&nbsp;
            <input
              name="payment_type"
              type="radio"
              checked={payment_type == 'recurring'}
              value="recurring"
              onChange={handleChange('payment_type')} />
            Recorrente&nbsp;&nbsp;
            <input
              name="payment_type"
              type="radio"
              checked={payment_type == 'users_choice'}
              value="users_choice"
              onChange={handleChange('payment_type')} />
            Usuário escolhe
          </p>
        </div>

        {(payment_type == 'recurring' || payment_type == 'users_choice') ?
        <div className="sm-col sm-col-12">
          <Label htmlFor="recurring_period">Intervalo da recorrência</Label>
          {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
          <p className=" mt1 mb3">
            <input
              name="recurring_period"
              type="radio"
              value="30"
              checked={recurring_period == 30}
              onChange={handleChange('recurring_period')}
              onBlur={handleBlur('recurring_period')} />
            Mensal&nbsp;&nbsp;
            <input
              name="recurring_period"
              type="radio"
              checked={recurring_period == 180}
              value="180"
              onChange={handleChange('recurring_period')} />
            Semestral&nbsp;&nbsp;
            <input
              name="recurring_period"
              type="radio"
              checked={recurring_period == 365}
              value="365"
              onChange={handleChange('recurring_period')} />
            Anual
          </p>
        </div> : ''}

        <div className="clearfix full-width meurio-scheme mb3">
          <Label htmlFor="main_color">Defina a cor da página de pagamento</Label>
          <p><small className="muted"><em>Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE. </em></small></p>
          <div className="clearfix"></div>
            <input
            id="main_color"
            type="hidden"
            className="field-light inline-block h3 mt1"
            value={selectedColorPicker}
            onChange={handleChange('main_color')}
            style={{height: '48px'}} />
          <ColorPicker
            color={selectedColorPicker}
            onChangeComplete={::this.handleColorClick}
            type="sketch" />
        </div>

        <div className="clearfix">
          <Label>Defina os valores para o bloco de doação</Label>
          <p><small className="muted"><em>Você pode ter até 5 valores por bloco de doação. Preencha apenas com números inteiros (Ex: 50)</em></small></p>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value1">Valor 1
              <input
                type="checkbox"
                onChange={handleChange('default_donation_value')}
                name="default_donation_value"
                checked={default_donation_value == 1 ? 'checked' : null}
                value="1" alt="Clique para definir este valor como padrão." />
            </Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value1"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="Ex.: R$20"
              style={{height: '48px', width: '90%'}}
              value={donation_value1}
              onChange={handleChange('donation_value1')}
              onBlur={handleBlur('donation_value1')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value2">Valor 2
              <input
                type="checkbox"
                onChange={handleChange('default_donation_value')}
                name="default_donation_value"
                checked={default_donation_value == 2 ? 'checked' : null}
                value="2" title="Clique para definir este valor como padrão." />
            </Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value2"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="Ex.: R$50"
              style={{height: '48px', width: '90%'}}
              value={donation_value2}
              onChange={handleChange('donation_value2')}
              onBlur={handleBlur('donation_value2')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value3">Valor 3
              <input
                type="checkbox"
                onChange={handleChange('default_donation_value')}
                name="default_donation_value"
                checked={default_donation_value == 3 ? 'checked' : null}
                value="3" title="Clique para definir este valor como padrão." />
            </Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value3"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="Ex.: R$100"
              style={{height: '48px', width: '90%'}}
              value={donation_value3}
              onChange={handleChange('donation_value3')}
              onBlur={handleBlur('donation_value3')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value4">Valor 4
              <input
                type="checkbox"
                onChange={handleChange('default_donation_value')}
                name="default_donation_value"
                checked={default_donation_value == 4 ? 'checked' : null}
                value="4" title="Clique para definir este valor como padrão." />
            </Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value4"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="Ex.: R$200"
              style={{height: '48px', width: '90%'}}
              value={donation_value4}
              onChange={handleChange('donation_value4')}
              onBlur={handleBlur('donation_value4')} />
          </div>
          <div className="sm-col sm-col-2">
            <Label htmlFor="donation_value5">Valor 5
              <input
                type="checkbox"
                onChange={handleChange('default_donation_value')}
                name="default_donation_value"
                checked={default_donation_value == 5 ? 'checked' : null}
                value="5" title="Clique para definir este valor como padrão." />
            </Label>
            {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
            <input
              id="donation_value5"
              type="number"
              className="field-light block h3 mt1 mb3"
              placeholder="Ex.: R$500"
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

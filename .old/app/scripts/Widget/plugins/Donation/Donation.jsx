import React, { PropTypes } from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from '../../../Paths'
import * as DonationActions from './actions'
import TellAFriend from '../../../components/shared/TellAFriend.jsx'
import { OverlayWidget } from '../../components'

import './assets/donation_widget.scss'

@reactMixin.decorate(Navigation)
class Donation extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      loading: false,
      success: false,
      selected_value: 1,
      selected_payment_type: 'recurring',
      errors: []
    }
  }

  componentDidMount() {
    const { widget } = this.props

    const defaultDonationValue = (
      widget.settings && widget.settings.defaultDonationValue ?
      widget.settings.defaultDonationValue : 1
    )
    this.setState({selected_value: Number(defaultDonationValue)})
  }

  componentWillReceiveProps() {
    if (this.state.loading) {
      this.setState({loading: false, success: true})
    }
  }

  handleOverlayOnClick() {
    const { mobilization, widget, editable } = this.props
    if (editable) {
      this.transitionTo(Paths.donationMobilizationWidget(mobilization.id, widget.id))
    }
  }

  handleClickSetTypeDonation(v) {
    this.setState({selected_payment_type: v})
  }

  handleClickSetValueDonation(v) {
    this.setState({selected_value: Number(v)})
  }

  handleClickDonate() {
    const { widget, dispatch } = this.props
    const { success, selected_value, selected_payment_type } = this.state
    const that = this

    const payment_type = widget.settings.payment_type
    const recurring_period = widget.settings.recurring_period
    const main_color = (widget.settings.main_color ? widget.settings.main_color : '#43a2cc')
    const encryption_key = process.env.PAGARME_KEY || 'setup env var'

    let checkout = new PagarMeCheckout.Checkout({"encryption_key": encryption_key, success: (data) => {
      if (payment_type === 'users_choice' ) {
        data.subscription = (selected_payment_type === 'unique' ? false : true)
      } else {
        data.subscription = (payment_type === 'unique' ? false : true)
      }
      data.recurring_period = recurring_period
      data.mobilization_id = this.props.mobilization.id
      data.widget_id = this.props.widget.id
      data.amount = widget.settings['donation_value' + selected_value] + "00"

      that.setState({success: true})
      dispatch(DonationActions.finishTransaction(data))
    }, error: function(err) {
      console.log(err)
    }})

    const params = {
      'createToken': 'false',
      'amount': widget.settings['donation_value' + selected_value] + '00',
      'customerData': 'true',
      'paymentMethods': widget.settings.payment_methods === 'true' ? 'credit_card,boleto' : 'credit_card',
      'uiColor': main_color,
      'paymentButtonText': widget.settings.button_text
    }
    checkout.open(params)
  }

  renderButton() {
    const { configurable, widget, mobilization: { header_font: headerFont } } = this.props
    const { loading, success, selected_value, selected_payment_type } = this.state

    const button_text = ((widget.settings && widget.settings.button_text) ? widget.settings.button_text : 'Doar agora')
    const title_text = ((widget.settings && widget.settings.title_text) ? widget.settings.title_text : 'Clique para configurar seu bloco de doação')

    const donation_value1 = ((widget.settings && widget.settings.donation_value1) ? widget.settings.donation_value1 : 0)
    const donation_value2 = ((widget.settings && widget.settings.donation_value2) ? widget.settings.donation_value2 : 0)
    const donation_value3 = ((widget.settings && widget.settings.donation_value3) ? widget.settings.donation_value3 : 0)
    const donation_value4 = ((widget.settings && widget.settings.donation_value4) ? widget.settings.donation_value4 : 0)
    const donation_value5 = ((widget.settings && widget.settings.donation_value5) ? widget.settings.donation_value5 : 0)
    const main_color = ((widget.settings && widget.settings.main_color) ? widget.settings.main_color : '#54d0f6')

    const payment_type = ((widget.settings && widget.settings.payment_type) ? widget.settings.payment_type : 'unique')
    const recurring_period = ((widget.settings && widget.settings.recurring_period) ? widget.settings.recurring_period : 30)

    const periodLabelOptions = { 30:' mês', 180: ' semestre', 365: ' ano' }
    const periodLabelCurrent = periodLabelOptions[recurring_period]
    const periodLabel = (
      payment_type === 'unique' ||
      selected_payment_type === 'unique'
        ? ''  : periodLabelCurrent
    )

    if (!configurable) {
      return (
        <div className="donation center clearfix">
          <h2
            className="p2 m0 white rounded-top"
            style={{ fontFamily: headerFont, backgroundColor: main_color }}
          >
            {title_text}
          </h2>
          <script dangerouslySetInnerHTML={{__html: `
(function(i,s,o,g,r,a,m){i['PagarMeCheckoutObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://assets.pagar.me/checkout/checkout.js','PagarMeCheckout');`}} />
          <div className="p3 relative">

            {payment_type === 'users_choice' ? <div className="mb2 clearfix">
              <a href="#" onClick={::this.handleClickSetTypeDonation.bind(this, 'recurring')}
                style={selected_payment_type === 'recurring' ? {color: main_color} : {}}
                className={selected_payment_type === 'recurring' ? 'payment-type bold py1 col col-6 active' : 'payment-type bold py1 col col-6'}>
                <i className="icon-payment-recurring" />
                {'Apoiar todo ' + periodLabelCurrent}
              </a>
              <a href="#" onClick={::this.handleClickSetTypeDonation.bind(this, 'unique')}
                style={selected_payment_type === 'unique' ? {color: main_color} : {}}
                className={selected_payment_type === 'unique' ? 'payment-type bold py1 col col-6 active' : 'payment-type bold py1 col col-6'}>
                <i className="icon-payment-unique" />
                Doação única
              </a>
            </div> : ''}

          {donation_value1 <= 0 ? null : (
            <a
              href="#"
              onClick={::this.handleClickSetValueDonation.bind(this, 1)}
              style={selected_value !== 1 ? {} : { backgroundColor: this.convertHex(main_color, 35), color: main_color }}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selected_value === 1 ? 'active' : 'bg-darken-1')}
            >
              {"R$ " + donation_value1 + (payment_type === 'recurring' || (selected_payment_type === 'recurring' && payment_type !== 'unique') ? ' /' : '') + periodLabel}
            </a>
          )}
          {donation_value2 <= 0 ? null : (
            <a
              href="#"
              onClick={::this.handleClickSetValueDonation.bind(this, 2)}
              style={selected_value !== 2 ? {} : { backgroundColor: this.convertHex(main_color, 35), color: main_color }}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selected_value === 2 ? 'active' : 'bg-darken-1')}
            >
              {"R$ " + donation_value2 + (payment_type === 'recurring' || (selected_payment_type === 'recurring' && payment_type !== 'unique') ? ' /' : '') + periodLabel}
            </a>
          )}
          {donation_value3 <= 0 ? null : (
            <a
              href="#"
              onClick={::this.handleClickSetValueDonation.bind(this, 3)}
              style={selected_value !== 3 ? {} : { backgroundColor: this.convertHex(main_color, 35), color: main_color }}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selected_value === 3 ? 'active' : 'bg-darken-1')}
            >
              {"R$ " + donation_value3 + (payment_type === 'recurring' || (selected_payment_type === 'recurring' && payment_type !== 'unique') ? ' /' : '') + periodLabel}
            </a>
          )}
          {donation_value4 <= 0 ? null : (
            <a
              href="#"
              onClick={::this.handleClickSetValueDonation.bind(this, 4)}
              style={selected_value !== 4 ? {} : { backgroundColor: this.convertHex(main_color, 35), color: main_color }}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selected_value === 4 ? 'active' : 'bg-darken-1')}
            >
              {"R$ " + donation_value4 + (payment_type === 'recurring' || (selected_payment_type === 'recurring' && payment_type !== 'unique') ? ' /' : '') + periodLabel}
            </a>
          )}
          {donation_value5 <= 0 ? null : (
            <a
              href="#"
              onClick={::this.handleClickSetValueDonation.bind(this, 5)}
              style={selected_value !== 5 ? {} : { backgroundColor: this.convertHex(main_color, 35), color: main_color }}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selected_value === 5 ? 'active' : 'bg-darken-1')}
            >
              {"R$ " + donation_value5 + (payment_type === 'recurring' || (selected_payment_type === 'recurring' && payment_type !== 'unique') ? ' /' : '') + periodLabel}
            </a>
          )}

          <a
            href="#"
            onClick={::this.handleClickDonate}
            style={{ backgroundColor: main_color }}
            className="btn white caps bg-darken-4 p2 mt1 col-12 rounded border-box"
          >
            {button_text}
          </a>
          </div>
        </div>
      )
    }
  }

  convertHex(hex,opacity){
    hex = hex.replace('#','')
    let r = parseInt(hex.substring(0,2), 16)
    let g = parseInt(hex.substring(2,4), 16)
    let b = parseInt(hex.substring(4,6), 16)

    let result = 'rgba('+r+','+g+','+b+','+opacity/100+')'
    return result
  }

  renderOverlay() {
    const { editable, configurable } = this.props
    if (editable && !configurable && this.state.hasMouseOver) {
      return (
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-darken-4 h1 bold rounded z1">
          <div className="table full-height col-12 center">
            <div className="white table-cell align-middle">
              Clique para editar
            </div>
          </div>
        </div>
      )
    }
  }

  renderForm() {
    const { editable, configurable } = this.props
    const className = classnames({ 'relative': editable || !configurable })

    return (
      <div className={className}>
        {this.renderButton()}
      </div>
    )
  }

  renderThankyouText() {
    const { mobilization }  = this.props
    return (
      <TellAFriend {...this.props}
        message={"Oba, doação registrada! Sua doação é via boleto? Verifique seu email."}
        href={Paths.mobilization(mobilization)} />
    )
  }

  render() {
    const { editable } = this.props
    const { success } = this.state

    return (
      <OverlayWidget
        editable={editable}
        onClick={::this.handleOverlayOnClick}
        text="Clique para configurar o formulário de doação"
      >
        <div className="bg-white widget rounded">
          {success ? this.renderThankyouText() : this.renderForm()}
        </div>
      </OverlayWidget>
    )
  }
}

Donation.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  configurable: PropTypes.bool,
  hasNewField: PropTypes.bool
}

export default Donation

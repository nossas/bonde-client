import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import classnames from 'classnames'

import * as paths from '~client/paths'
import { FinishMessageCustom } from '~client/mobilizations/widgets/components'
import AnalyticsEvents from '~client/mobilizations/widgets/utils/analytics-events'
import { DonationTellAFriend } from '../../components'

if (require('exenv').canUseDOM) require('./index.scss')

class Donation extends React.Component {
  constructor (props, context) {
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

  componentDidMount () {
    const { widget } = this.props

    const defaultDonationValue = (
      widget.settings && widget.settings.default_donation_value
        ? widget.settings.default_donation_value
        : 1
    )
    this.setState({ selected_value: Number(defaultDonationValue) })
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading) {
      this.setState({ loading: false, success: true })
    }
  }

  handleOverlayOnClick () {
    const { mobilization, widget, editable } = this.props
    if (editable) {
      browserHistory.push(paths.donation(mobilization.id, widget.id))
    }
  }

  handleClickSetTypeDonation (v) {
    this.setState({ selected_payment_type: v })
  }

  handleClickSetValueDonation (v) {
    this.setState({ selected_value: Number(v) })
  }

  handleClickDonate () {
    const { widget, handleDonationTransactionCreate } = this.props
    const {
      selected_value: selectedValue,
      selected_payment_type: selectedPaymentType
    } = this.state
    const that = this

    const paymentType = widget.settings.payment_type
    const recurringPeriod = widget.settings.recurring_period
    const mainColor = (widget.settings.main_color ? widget.settings.main_color : '#43a2cc')

    let checkout = new PagarMeCheckout.Checkout({
      encryption_key: process.env.PAGARME_KEY || 'setup env var',
      success: data => {
        data.subscription = paymentType === 'users_choice'
          ? (selectedPaymentType !== 'unique')
          : data.subscription = (paymentType !== 'unique')

        data.recurring_period = recurringPeriod
        data.mobilization_id = this.props.mobilization.id
        data.widget_id = this.props.widget.id
        data.amount = widget.settings['donation_value' + selectedValue] + '00'

        that.setState({ success: true })
        handleDonationTransactionCreate(data)
      },
      error: err => { console.error(err) }
    })

    const params = {
      createToken: 'false',
      amount: widget.settings['donation_value' + selectedValue] + '00',
      customerData: 'true',
      paymentMethods: widget.settings.payment_methods === 'true' ? 'credit_card,boleto' : 'credit_card',
      uiColor: mainColor,
      paymentButtonText: widget.settings.button_text
    }

    AnalyticsEvents.donationSetValue()

    checkout.open(params)
  }

  renderButton () {
    const { configurable, widget, mobilization: { header_font: headerFont } } = this.props
    const {
      selected_value: selectedValue,
      selected_payment_type: selectedPaymentType
    } = this.state

    const buttonText = ((widget.settings && widget.settings.button_text) ? widget.settings.button_text : 'Doar agora')
    const titleText = ((widget.settings && widget.settings.title_text) ? widget.settings.title_text : 'Clique para configurar seu bloco de doação')

    const donationValue1 = ((widget.settings && widget.settings.donation_value1) ? widget.settings.donation_value1 : 0)
    const donationValue2 = ((widget.settings && widget.settings.donation_value2) ? widget.settings.donation_value2 : 0)
    const donationValue3 = ((widget.settings && widget.settings.donation_value3) ? widget.settings.donation_value3 : 0)
    const donationValue4 = ((widget.settings && widget.settings.donation_value4) ? widget.settings.donation_value4 : 0)
    const donationValue5 = ((widget.settings && widget.settings.donation_value5) ? widget.settings.donation_value5 : 0)
    const mainColor = ((widget.settings && widget.settings.main_color) ? widget.settings.main_color : '#54d0f6')

    const paymentType = ((widget.settings && widget.settings.payment_type) ? widget.settings.payment_type : 'unique')
    const recurringPeriod = ((widget.settings && widget.settings.recurring_period) ? widget.settings.recurring_period : 30)

    const periodLabelOptions = { 30: ' mês', 180: ' semestre', 365: ' ano' }
    const periodLabelCurrent = periodLabelOptions[recurringPeriod]
    const periodLabel = paymentType === 'unique' || selectedPaymentType === 'unique' ? ''
      : periodLabelCurrent

    if (!configurable) {
      return (
        <div className='donation center clearfix'>
          <h2
            className='p2 m0 white rounded-top'
            style={{ fontFamily: headerFont, backgroundColor: mainColor }}
          >
            {titleText}
          </h2>
          <script dangerouslySetInnerHTML={{__html: `
(function(i,s,o,g,r,a,m){i['PagarMeCheckoutObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://assets.pagar.me/checkout/checkout.js','PagarMeCheckout');`}} />
          <div className='p3 relative'>

            {paymentType === 'users_choice' ? <div className='mb2 clearfix'>
              <a href='#' onClick={::this.handleClickSetTypeDonation.bind(this, 'recurring')}
                style={selectedPaymentType === 'recurring' ? {color: mainColor} : {}}
                className={selectedPaymentType === 'recurring' ? 'payment-type bold py1 col col-6 active' : 'payment-type bold py1 col col-6'}>
                <i className='icon-payment-recurring' />
                {'Apoiar todo ' + periodLabelCurrent}
              </a>
              <a href='#' onClick={::this.handleClickSetTypeDonation.bind(this, 'unique')}
                style={selectedPaymentType === 'unique' ? {color: mainColor} : {}}
                className={selectedPaymentType === 'unique' ? 'payment-type bold py1 col col-6 active' : 'payment-type bold py1 col col-6'}>
                <i className='icon-payment-unique' />
                Doação única
              </a>
            </div> : ''}

            {donationValue1 <= 0 ? null : (
              <a
                href='#'
                onClick={::this.handleClickSetValueDonation.bind(this, 1)}
                style={selectedValue !== 1 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 1 ? 'active' : 'bg-darken-1')}
            >
                {'R$ ' + donationValue1 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
              </a>
          )}
            {donationValue2 <= 0 ? null : (
              <a
                href='#'
                onClick={::this.handleClickSetValueDonation.bind(this, 2)}
                style={selectedValue !== 2 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 2 ? 'active' : 'bg-darken-1')}
            >
                {'R$ ' + donationValue2 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
              </a>
          )}
            {donationValue3 <= 0 ? null : (
              <a
                href='#'
                onClick={::this.handleClickSetValueDonation.bind(this, 3)}
                style={selectedValue !== 3 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 3 ? 'active' : 'bg-darken-1')}
            >
                {'R$ ' + donationValue3 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
              </a>
          )}
            {donationValue4 <= 0 ? null : (
              <a
                href='#'
                onClick={::this.handleClickSetValueDonation.bind(this, 4)}
                style={selectedValue !== 4 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 4 ? 'active' : 'bg-darken-1')}
            >
                {'R$ ' + donationValue4 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
              </a>
          )}
            {donationValue5 <= 0 ? null : (
              <a
                href='#'
                onClick={::this.handleClickSetValueDonation.bind(this, 5)}
                style={selectedValue !== 5 ? {} : { backgroundColor: this.convertHex(mainColor, 35), color: mainColor }}
                className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 5 ? 'active' : 'bg-darken-1')}
            >
                {'R$ ' + donationValue5 + (paymentType === 'recurring' || (selectedPaymentType === 'recurring' && paymentType !== 'unique') ? ' /' : '') + periodLabel}
              </a>
          )}

            <a
              href='#'
              onClick={::this.handleClickDonate}
              style={{ backgroundColor: mainColor }}
              className='btn white caps bg-darken-4 p2 mt1 col-12 rounded border-box'
          >
              {buttonText}
            </a>
          </div>
        </div>
      )
    }
  }

  convertHex (hex, opacity) {
    hex = hex.replace('#', '')
    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    let result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
    return result
  }

  renderOverlay () {
    const { editable, configurable } = this.props
    if (editable && !configurable && this.state.hasMouseOver) {
      return (
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-darken-4 h1 bold rounded z1'>
          <div className='table full-height col-12 center'>
            <div className='white table-cell align-middle'>
              Clique para editar
            </div>
          </div>
        </div>
      )
    }
  }

  renderForm () {
    const { editable, configurable } = this.props
    const className = classnames({ 'relative': editable || !configurable })

    return (
      <div className={className}>
        {this.renderButton()}
      </div>
    )
  }

  renderThankyouText () {
    const { mobilization, widget } = this.props
    const { settings: { finish_message_type: finishMessageType } } = widget

    return finishMessageType === 'custom' ? (
      <FinishMessageCustom widget={widget} />
    ) : (
      <DonationTellAFriend mobilization={mobilization} />
    )
  }

  render () {
    const { success } = this.state

    return (
      <div className='bg-white widget rounded'>
        {success ? this.renderThankyouText() : this.renderForm()}
      </div>
    )
  }
}

Donation.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  configurable: PropTypes.bool,
  hasNewField: PropTypes.bool,
  handleDonationTransactionCreate: PropTypes.func
}

export default Donation

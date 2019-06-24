import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { injectIntl } from 'react-intl'
import AnalyticsEvents from 'mobilizations/widgets/utils/analytics-events'
import { asyncDonationTransactionCreate } from '../action-creators'

import * as graphqlQueries from 'graphql/queries'
import { factoryDonation } from 'mobrender-v2/widgets/donation'
import { FinishMessageCustom } from 'mobilizations/widgets/components'
import DonationTellAFriend from './donation-tell-a-friend'
import DonationFinishPostDonation from './donation-finish-post-donation'

const Donation = factoryDonation({
  finishMessageCustom: FinishMessageCustom,
  tellAFriend: DonationTellAFriend,
  finishPostDonation: DonationFinishPostDonation,
})

const mapStateToProps = state => ({
  donationCustomerData: state.mobilizations.plugins.donation.customerData
})

const mapDispatchToProps = dispatch => ({
  handleDonationTransactionCreate: ({
    mobilization,
    widget,
    selectedValue,
    selectedPaymentType,
    onSucess,
    onError,
    storedDonationCustomerData
  }) => new Promise((resolve, reject) => {
    const paymentType = widget.settings.payment_type
    const recurringPeriod = widget.settings.recurring_period
    const mainColor = widget.settings.main_color
      ? widget.settings.main_color
      : '#43a2cc'

    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: process.env.REACT_APP_PAGARME_KEY || 'setup env var',
      success: (data) => {
        data.subscription = paymentType === 'users_choice'
          ? (selectedPaymentType !== 'unique')
          : data.subscription = (paymentType !== 'unique')

        data.recurring_period = recurringPeriod
        data.mobilization_id = mobilization.id
        data.widget_id = widget.id
        data.amount = widget.settings['donation_value' + selectedValue] + '00'

        dispatch(asyncDonationTransactionCreate(data))
          .then(resolve)
          .catch(reject)
      },
      error: (err) => { console.error(err) }
    })

    const customerData = {}
    if (storedDonationCustomerData) {
      const d = storedDonationCustomerData

      // reference: https://docs.pagar.me/v2017-07-17/docs/inserindo-o-formulario
      customerData.customerName = d.name
      customerData.customerDocumentNumber = d.document_number
      customerData.customerEmail = d.email
      customerData.customerPhoneDdd = d.phone.ddd
      customerData.customerPhoneNumber = d.phone.number
      customerData.customerAddressZipcode = d.address.zipcode
      customerData.customerAddressStreet = d.address.street
      customerData.customerAddressStreetNumber = d.address.street_number
      customerData.customerAddressComplementary = d.address.complementary
      customerData.customerAddressNeighborhood = d.address.neighborhood
      customerData.customerAddressCity = d.address.city
      customerData.customerAddressState = d.address.state
    }

    const params = {
      createToken: 'false',
      amount: widget.settings['donation_value' + selectedValue] + '00',
      customerData: 'true',
      paymentMethods: widget.settings.payment_methods === 'true' ? 'credit_card,boleto' : 'credit_card',
      uiColor: mainColor,
      paymentButtonText: widget.settings.button_text,
      ...customerData
    }

    AnalyticsEvents.donationSetValue()

    checkout.open(params)
  })
})

export default graphql(
  graphqlQueries.fetchDonationGoalStats, {
    name: 'donationGoalStats',
    options: props => ({
      variables: { widgetId: props.widget.id },
      fetchPolicy: 'network-only'
    })
  })(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Donation)))

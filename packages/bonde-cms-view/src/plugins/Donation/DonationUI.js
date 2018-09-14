import React from 'react'
import PropTypes from 'prop-types'
import {
  Header,
  Button,
  DonationInput,
  DonationTypeBox,
  Form,
  ProgressBar
} from './components'

class DonationUI extends React.Component {
  
  state = {
    donationValueSelected: this.props.defaultDonationValue,
    paymentTypeSelected: this.props.paymentTypes[0].kind,
    submitting: false,
    submitted: false
  }

  getDonationValueLabel (donationValue) {
    const { paymentTypeSelected } = this.state 
    if (paymentTypeSelected !== 'unique') {
      const paymentType = this.props.paymentTypes.find(p => p.kind === paymentTypeSelected)
      return `R$ ${donationValue} /${paymentType.period}`
    }
    return `R$ ${donationValue}`
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ submitting: true })
    
    const { donationValueSelected, paymentTypeSelected } = this.state
    
    return this.props.onSubmit({
      donationValue: donationValueSelected,
      paymentType: paymentTypeSelected
    }).then(() => {
      this.setState({ submitting: false, submitted: true })
    })
  }

  render () {
    const {
      mainColor,
      headerTitle,
      submitLabel,
      donationValues,
      paymentTypes,
      progressBarComponent: ProgressBarComponent
    } = this.props
    const { donationValueSelected, paymentTypeSelected } = this.state

    return (
      <React.Fragment>
        <Header bgColor={mainColor}>{headerTitle}</Header> 
        <Form onSubmit={this.handleSubmit.bind(this)}>
          {paymentTypes.length > 1 && (
            <DonationTypeBox>
              {paymentTypes.map((paymentType, i) => (
                <DonationTypeBox.Item
                  key={`paymentType-${i}`}
                  active={paymentType.kind === paymentTypeSelected}
                  onClick={() => {
                    this.setState({ paymentTypeSelected: paymentType.kind })
                  }}
                >
                  <DonationTypeBox.Icon name={paymentType.kind} />
                  {paymentType.label}
                </DonationTypeBox.Item>
              ))}
            </DonationTypeBox>
          )}
          {donationValues && donationValues.map((donationValue, i) => (
            <DonationInput
              key={`donationInput-${i}`}
              mainColor={mainColor}
              active={donationValue === donationValueSelected}
              onClick={() => {
                this.setState({ donationValueSelected: donationValue })
              }}
            >
              {this.getDonationValueLabel(donationValue)}
            </DonationInput>
          ))}
          <Button bgColor={mainColor} type='submit'>{submitLabel}</Button>
        </Form>
        {ProgressBarComponent && <ProgressBarComponent />}
      </React.Fragment>
    )
  }
}

DonationUI.defaultProps = {
  mainColor: '#54d0f6',
  donationValues: []
}

DonationUI.propTypes = {
  defaultDonationValue: PropTypes.number,
  donationValues: PropTypes.array.isRequired,
  paymentTypes: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  progressBarComponent: PropTypes.any
}

DonationUI.ProgressBar = ProgressBar

export default DonationUI

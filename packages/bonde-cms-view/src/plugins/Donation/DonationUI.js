import React from 'react'
import PropTypes from 'prop-types'
import { Header, Button, DonationInput, Form } from './components'

class DonationUI extends React.Component {
  
  state = {
    donationValueSelected: this.props.defaultDonationValue
  }

  render () {
    const { mainColor, headerTitle, submitLabel, donationValues } = this.props
    const { donationValueSelected } = this.state

    return (
      <React.Fragment>
        <Header bgColor={mainColor}>{headerTitle}</Header>
        <Form onSubmit={e => e.preventDefault()}>
          {donationValues && donationValues.map((donationValue, i) => (
            <DonationInput
              key={`donationInput-${i}`}
              mainColor={mainColor}
              active={donationValue === donationValueSelected}
              onClick={() => {
                this.setState({ donationValueSelected: donationValue })
              }}
            >
              {`R$ ${donationValue}`}
            </DonationInput>
          ))}
          <Button bgColor={mainColor} type='submit'>{submitLabel}</Button>
        </Form>
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
  donationValues: PropTypes.array.isRequired
}

export default DonationUI

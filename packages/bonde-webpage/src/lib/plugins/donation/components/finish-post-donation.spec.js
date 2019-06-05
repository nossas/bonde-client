import FinishPostDonation from './finish-post-donation'
import { shallow } from 'enzyme'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import test from 'ava'
import sinon from 'sinon'

const props = {
  widget: {
    settings: {
      default_donation_value: '3',
      donation_value1: "20",
      donation_value2: "50",
      donation_value3: "100",
      donation_value4: "200",
      donation_value5: "500",
    }
  },
  mobilization: {
    header_font: 'ubuntu'
  }
}

const setupFinishPostDonation = () => {
  const wrapper = shallow(<IntlProvider>
    <FinishPostDonation {...props} />
  </IntlProvider>)

  const finishPostDonation = wrapper.shallow()

  return { wrapper, finishPostDonation }
}

test('it renders without crashes', t => {
  const { finishPostDonation } = setupFinishPostDonation()
  t.truthy(finishPostDonation)
})

test('default value for select its the same of donation configuration option', t => {
  const { finishPostDonation } = setupFinishPostDonation()
  t.is(finishPostDonation.find('select[value="donation_value3"]').length, 1)
})

test('selecting an option changes component state', t => {
  const { finishPostDonation } = setupFinishPostDonation()
  const select = finishPostDonation.find('select')
  select.simulate('change', { currentTarget: { value: '4321' } })
  t.is(finishPostDonation.state('selectedValue'), '4321')
})

test('value returned to parent is the same that was donated', t => {
  const { finishPostDonation } = setupFinishPostDonation()
  const callback = sinon.fake()
  finishPostDonation.setProps({ ...props, onFinish: callback })
  finishPostDonation.find('#donate-btn').simulate('click')
  t.log(callback)
})
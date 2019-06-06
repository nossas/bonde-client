import React from 'react'
import { shallow } from 'enzyme'
import { ProviderI18n, i18n } from './'
import { expect } from 'chai'

it('render a I18nextProvider component with instance of i18next', () => {
  const node = shallow(
    <ProviderI18n>
      <div />
    </ProviderI18n>
  )
  const providerI18next = node.find('I18nextProvider')
  expect(providerI18next).to.be.lengthOf(1)
  expect(providerI18next.props().i18n).to.be.equal(i18n)
})

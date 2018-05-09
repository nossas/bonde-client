import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { ProviderI18n, i18n } from './'

test('render a I18nextProvider component with instance of i18next', t => {
  const node = shallow(
    <ProviderI18n>
      <div />
    </ProviderI18n>
  )
  const providerI18next = node.find('I18nextProvider')
  t.is(providerI18next.length, 1)
  t.is(providerI18next.props().i18n, i18n)
})

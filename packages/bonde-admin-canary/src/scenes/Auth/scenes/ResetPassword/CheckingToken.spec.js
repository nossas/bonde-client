import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import { Loading } from 'components/Loadable'
import CheckingToken from './CheckingToken'

test('render loading', t => {
  const i18n = key => key
  const node = shallow(<CheckingToken t={i18n} />)
  const loading = node.find(Loading)

  t.is(loading.props().message, 'resetPassword.checkingToken')
})

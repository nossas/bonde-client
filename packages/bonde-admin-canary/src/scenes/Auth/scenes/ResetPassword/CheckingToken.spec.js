import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Loading } from 'components/Loadable'
import CheckingToken from './CheckingToken'

it('render loading', () => {
  const i18n = key => key
  const node = shallow(<CheckingToken t={i18n} />)
  const loading = node.find(Loading)
  expect(loading.props().message).to.be.equal('resetPassword.checkingToken')
})

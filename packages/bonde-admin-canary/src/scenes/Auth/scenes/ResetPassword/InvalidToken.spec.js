import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import { Trans } from 'react-i18next'
import { Title } from 'bonde-styleguide'
import Link, { ButtonLink } from 'components/Link'
import InvalidToken from './InvalidToken'

test.beforeEach(t => {
  const i18n = key => key
  t.context.node = shallow(<InvalidToken t={i18n} />)
})

test('should render header infos', t => {
  const { node } = t.context
  const title = node.find(Title.H2)
  const subtitle = node.find(Title.H4).at(0)
  
  t.is(title.props().children, 'resetPassword.invalidToken.title')
  t.is(subtitle.props().children, 'resetPassword.invalidToken.subtitle')
})

test('should render a link to forget password', t => {
  const { node } = t.context
  const description = node.find(Title.H4).at(1)
  const trans = description.find(Trans)
  const link = trans.find(Link)
  
  t.is(link.props().to, '/auth/forget-password')
  t.is(trans.props().i18nKey, 'resetPassword.invalidToken.resendToken')
})

test('should render a link to login', t => {
  const { node } = t.context
  const link = node.find(ButtonLink)

  t.is(link.props().to, '/auth/login')
  t.is(link.props().children, 'resetPassword.invalidToken.goBackLogin')
})

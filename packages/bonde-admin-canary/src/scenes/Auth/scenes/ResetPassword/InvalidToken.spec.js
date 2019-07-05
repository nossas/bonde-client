import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Trans } from 'react-i18next'
import { Title } from 'bonde-styleguide'
import Link, { ButtonLink } from 'components/Link'
import InvalidToken from './InvalidToken'

describe('scenes > Auth > scenes > ResetPassword > InvalidToken', () => {
  let node

  beforeEach(() => {
    const i18n = key => key
    node = shallow(<InvalidToken t={i18n} />)
  })

  it('should render header infos', () => {
    const title = node.find(Title.H2)
    const subtitle = node.find(Title.H4).at(0)

    expect(title.props().children).to.be.equal('resetPassword.invalidToken.title')
    expect(subtitle.props().children).to.be.equal('resetPassword.invalidToken.subtitle')
  })

  it('should render a link to forget password', () => {
    const description = node.find(Title.H4).at(1)
    const trans = description.find(Trans)
    const link = trans.find(Link)

    expect(link.props().to).to.be.equal('/auth/forget-password')
    expect(trans.props().i18nKey).to.be.equal('resetPassword.invalidToken.resendToken')
  })

  it('should render a link to login', () => {
    const link = node.find(ButtonLink)

    expect(link.props().to).to.be.equal('/auth/login')
    expect(link.props().children).to.be.equal('resetPassword.invalidToken.goBackLogin')
  })
})

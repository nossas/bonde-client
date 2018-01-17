import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'

import * as arrayUtil from '~client/utils/array'
import CustomDomainPage from '~routes/public/custom-domain/page'

const defaultFavicon32 = require('exenv').canUseDOM
  ? require('~client/images/icon/favicon-32.png')
  : ''
const defaultFavicon16 = require('exenv').canUseDOM
  ? require('~client/images/icon/favicon-16.png')
  : ''

describe('routes/public/custom-domain/page', () => {
  let wrapper
  const props = {
    mobilization: {
      header_font: 'Arial',
      body_font: 'Comic Sans MS'
    },
    blocks: [],
    widgets: []
  }

  beforeEach(() => {
    wrapper = shallow(<CustomDomainPage {...props} />, { disableLifecycleMethods: true })
  })

  it('render without crashed', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper).to.be.ok
  })

  it('should render bonde favicon by default', () => {
    const link = [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: defaultFavicon32
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: defaultFavicon16
      }
    ]
    expect(wrapper.find(Helmet).props().link).to.deep.equal(link)
  })

  it('should render Mobilization with editable prop as undefined', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.find('Connect(Mobilization)').props().editable).to.be.undefined
  })

  it('should render TechnicalIssues if mobilization undefined', () => {
    wrapper.setProps({ mobilization: undefined })
    expect(wrapper.find('TechnicalIssues').length).to.equal(1)
  })

  it('should render GoogleFontsLoader with mobilization fonts', () => {
    const { mobilization } = props
    const fonts = [mobilization.header_font, mobilization.body_font]
    const fontsLoader = wrapper.find('GoogleFontsLoader')
    expect(fontsLoader.props().fonts).to.deep.equal(fonts)
  })

  it('should render helmet with favicon if passed on mobilization', () => {
    const favicon = 'http://favicon'
    const link = [
      {
        rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon
      },
      {
        rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon
      }
    ]

    const mobilization = { ...props.mobilization, favicon }
    wrapper.setProps({ mobilization })
    expect(wrapper.find(Helmet).props().link).to.deep.equal(link)
  })

  it('should not render reapeat font in GoogleFontsLoader', () => {
    const font = 'Arial'
    wrapper.setProps({ mobilization: { header_font: font, body_font: font } })

    const fonts = [font, font].filter(arrayUtil.distinct)
    const fontsLoader = wrapper.find('GoogleFontsLoader')
    expect(fontsLoader.props().fonts).to.deep.equal(fonts)
  })
})

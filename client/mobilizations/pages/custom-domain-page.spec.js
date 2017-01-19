import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { CustomDomainPage } from './custom-domain-page'
import * as arrayUtil from '../../../util/array'

describe('app/modules/mobilizations/pages/custom-domain-page', () => {
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
    wrapper = mount(<CustomDomainPage {...props} />)
  })

  it('render without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('should render Mobilization with editable false', () => {
    expect(wrapper.find('Mobilization').props().editable).to.equal(false)
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

  it('should not render reapeat font in GoogleFontsLoader', () => {
    const font = 'Arial'
    wrapper.setProps({ mobilization: { header_font: font, body_font: font } })

    const fonts = [font, font].filter(arrayUtil.distinct)
    const fontsLoader = wrapper.find('GoogleFontsLoader')
    expect(fontsLoader.props().fonts).to.deep.equal(fonts)
  })
})

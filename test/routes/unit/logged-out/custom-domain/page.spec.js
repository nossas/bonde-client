import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import * as arrayUtil from '~utils/array'
import CustomDomainPage from '~routes/not-authenticated/custom-domain/page'

describe('routes/not-authenticated/custom-domain/page', () => {
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
    wrapper = shallow(<CustomDomainPage {...props} />)
  })

  it('render without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('should render Mobilization with editable prop as undefined', () => {
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

  it('should not render reapeat font in GoogleFontsLoader', () => {
    const font = 'Arial'
    wrapper.setProps({ mobilization: { header_font: font, body_font: font } })

    const fonts = [font, font].filter(arrayUtil.distinct)
    const fontsLoader = wrapper.find('GoogleFontsLoader')
    expect(fontsLoader.props().fonts).to.deep.equal(fonts)
  })
})

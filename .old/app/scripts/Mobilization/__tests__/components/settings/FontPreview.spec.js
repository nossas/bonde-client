import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { FontPreview } from '../../../components/settings'

describe('Mobilization/components/settings/FontPreview', () => {
  let wrapper
  const props = {
    text: 'Foo Bar Text!'
  }

  beforeEach(() => {
    wrapper = shallow(<FontPreview {...props} />)
  })

  context('default', () => {
    it('should have one <h1> element', () => {
      expect(wrapper.find('h1')).to.have.lengthOf(1)
    })
    it('should render with expected className', () => {
      expect(wrapper.props().className).to.equal('bg-white border rounded p2 mb3')
    })
    it('should render with expected text', () => {
      expect(wrapper.text()).to.equal(props.text)
    })
  })

  context('custom props', () => {
    it('should render with expected componentClass', () => {
      wrapper.setProps({ componentClass: 'p' })
      expect(wrapper.find('p')).to.have.lengthOf(1)
    })
    it('should render with expected className', () => {
      wrapper.setProps({ className: ['bar', 'foo'] })
      expect(wrapper.props().className).to.have.string('bar foo')
    })
    it('should render with expected text', () => {
      const text = 'Fooz Barz Text'
      wrapper.setProps({ text })
      expect(wrapper.text()).to.equal(text)
    })
  })
})

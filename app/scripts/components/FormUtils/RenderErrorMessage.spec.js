import React from 'react'

import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import RenderErrorMessage from './RenderErrorMessage'


describe('RenderErrorMessage', () => {
  let props = {
    error: ''
  }

  it('should render noscript if error not exists', () => {
    let wrapper = render(<RenderErrorMessage {...props} />)
    expect(wrapper).to.be.blank
  })

  it('should render div.red when exists error', () => {
    props.error = 'asdasd'
    let wrapper = shallow(<RenderErrorMessage {...props} />)
    expect(wrapper.find('div.red').length).to.equal(1)
  })

  it('should render error text in div', () => {
    props.error = 'adsad'
    let wrapper = shallow(<RenderErrorMessage {...props} />)
    expect(wrapper.find('div.red').text()).to.equal(props.error)
  })
})

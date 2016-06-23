import React from 'react'

import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import RenderInputError from './RenderInputError'


describe('RenderInputError', () => {
  let props = {
    error: '',
    touched: false
  }

  it('should render noscript if not error exists', () => {
    let wrapper = render(<RenderInputError {...props} />)
    expect(wrapper).to.be.blank
  })

  it('should render span.red if error exists and input touched', () => {
    props.error = 'sadas'
    props.touched = true

    let wrapper = shallow(<RenderInputError {...props} />)
    expect(wrapper.find('span.red').length).to.equal(1)
  })

  it('should render noscript if error but not input touched', () => {
    props.error = 'asdas'
    props.touched = false

    let wrapper = shallow(<RenderInputError {...props} />)
    expect(wrapper).to.be.blank
  })

  it('should render text error in span', () => {
    props.error = 'asdas'
    props.touched = true

    let wrapper = shallow(<RenderInputError {...props} />)
    expect(wrapper.find('span.red').text()).to.equal(props.error)
  })
})

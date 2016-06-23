import React from 'react'

import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import RenderInputLength from './RenderInputLength'


describe('RenderInputLength', () => {
  let props = {
    value: '',
    limit: 10
  }

  it('should not render if value length equals 0', () => {
    let wrapper = render(<RenderInputLength {...props} />)
    expect(wrapper).to.be.blank
  })

  it('should render div if value length greater 0', () => {
    props.value = 'abc'
    let wrapper = shallow(<RenderInputLength {...props} />)

    expect(wrapper.find('div').length).to.equal(1)
  })

  it('should render correct value for count remaining', () => {
    props.value = 'abc'
    props.limit = 5

    let expected_text = props.limit - props.value.length

    let wrapper = shallow(<RenderInputLength {...props} />)
    expect(wrapper.find('div').at(0).text()).to.equal(expected_text.toString())
  })

  it('shoud add class .red if length of value greater limit - 10', () => {
    props.value = 'abcdefghij'
    props.limit = 19

    let wrapper = shallow(<RenderInputLength {...props} />)
    expect(wrapper.find('.red').length).to.equal(1)
  })
})

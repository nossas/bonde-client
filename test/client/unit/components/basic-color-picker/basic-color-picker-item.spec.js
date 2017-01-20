import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { BasicColorPickerItem } from '~components/basic-color-picker'

describe('client/components/basic-color-picker/basic-color-picker-item', () => {
  let wrapper
  const onClick = () => true
  const props = {
    bgClass: 'bg-black',
    selectedClass: 'bg-white',
    onClick: onClick.bind(wrapper)
  }

  beforeAll(() => {
    wrapper = shallow(<BasicColorPickerItem {...props} />)
  })

  describe('#render', () => {
    afterEach(() => {
      wrapper.setProps(props)
    })

    it('should render unselected and bind onClick event', () => {
      expect(wrapper.instance().props.style).to.be.undefined
      expect(wrapper.instance().props.onClick.toString()).to.equal(onClick.bind(wrapper).toString())
    })

    it('should render selected', () => {
      wrapper.setProps({ ...props, selectedClass: 'bg-black' })
      expect(wrapper.props().children.props.style).to.have.property('borderWidth')
    })
  })
})

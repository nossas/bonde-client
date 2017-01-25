import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { BasicColorPicker } from '~components/basic-color-picker'

describe('BasicColorPicker', () => {
  let wrapper
  const onClick = () => { window.alert('color was clicked!') }

  beforeAll(() => {
    wrapper = shallow(
      <BasicColorPicker
        selectedClass='bg-white '
        onClick={onClick.bind(wrapper)}
        colorScheme='nossascidades'
      />
    )
  })

  describe('#renderColors', () => {
    it('should render with passed colors and bind onClick event', () => {
      const colors = wrapper.instance().renderColors(['foo', 'bar'])
      expect(colors).to.have.length(2)
      expect(colors[0].props.bgClass).to.equal('foo')
      expect(colors[1].props.bgClass).to.equal('bar')
      expect(colors[0].props.onClick.toString()).to.equal(onClick.bind(wrapper).toString())
      expect(colors[1].props.onClick.toString()).to.equal(onClick.bind(wrapper).toString())
    })
  })

  describe('#render', () => {
    it('should render with all colors', () => {
      expect(wrapper.find('BasicColorPickerItem')).to.have.length(40)
    })
  })
})

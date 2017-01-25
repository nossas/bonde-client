import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

// Current module dependencies
import { BlockColorPicker } from '~mobilizations/blocks/components'

let wrapper
const props = {
  props: {
    mobilization: { id: 1 },
    block: {},
    dispatch: () => {}
  },
  state: {
    bgClass: 'bgClass',
    bgImage: 'bgImage',
    uploadProgress: 0,
    editingBackground: false
  },
  onChange: () => {}
}

describe('', () => {
  beforeAll(() => {
    wrapper = shallow(<BlockColorPicker {...props} />)
  })

  describe('#handleCancelEdit', () => {
    it('should set editing background to false', () => {
      wrapper = shallow(<BlockColorPicker {...props} />)
      wrapper.setProps(setState(props, { editingBackground: true }))
      wrapper.find('button').at(1).simulate('click')
      expect(wrapper.instance().props.state.bgClass).to.equal(props.state.bgClass)
      expect(wrapper.instance().props.state.bgImage).to.equal(props.state.bgImage)
    })
  })
})

const setState = (props, state) => ({
  ...props,
  state: {
    ...props.state,
    ...state
  }
})

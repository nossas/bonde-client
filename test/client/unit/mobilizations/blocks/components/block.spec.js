import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import Block from '~mobilizations/blocks/components'

const widget1 = { block_id: 1, id: 1, settings: { content: 'My widget1' } }
const widget2 = { block_id: 2, id: 2, settings: { content: 'My widget2' } }
const widgets = [widget1, widget2]
const block = { id: 1, bg_class: 'bg-1', bg_image: 'foobar.jpg', hidden: false }
const blocks = {}
const auth = {credentials: { x: 'y' }}
const dispatch = () => { return true }

let wrapper
const props = {
  widgets,
  blocks,
  block,
  auth,
  dispatch,
  mobilization: {},
  editable: true,
  canMoveUp: true,
  canMoveDown: true
}

describe('Block', () => {
  describe('#constructor', () => {
    it('should set initial state', () => {
      wrapper = shallow(<Block {...props} />)
      expect(wrapper.state()).to.deep.equal({
        hasMouseOver: false,
        editingBackground: false,
        editingWidget: false,
        bgClass: block.bg_class,
        bgImage: block.bg_image,
        uploadProgress: null,
        loading: false
      })
    })
  })

  describe('#render', () => {
    it('should render BlockWidgets component', () => {
      wrapper = shallow(<Block {...props} />)
      expect(wrapper.find('BlockWidgets')).to.have.length(1)
    })

    it('should render color picker when editing background', () => {
      wrapper = shallow(<Block {...props} />)
      wrapper.setState({ editingBackground: true })
      expect(wrapper.find('BlockColorPicker')).to.have.length(1)
    })

    it('should not render color picker when editing background', () => {
      wrapper = shallow(<Block {...props} />)
      wrapper.setState({ editingBackground: false })
      expect(wrapper.find('BlockColorPicker')).to.have.length(0)
    })
  })
})

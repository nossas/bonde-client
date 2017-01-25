import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { BlockDropdownMenu } from '~mobilizations/blocks/components'

describe('client/mobilizations/blocks/components/block-dropdown-menu', () => {
  let wrapper
  const props = {
    state: {
      hasMouseOver: false
    },
    props: {
      dispatch: () => {},
      block: {
        hidden: false
      }
    }
  }

  beforeAll(() => {
    wrapper = shallow(<BlockDropdownMenu {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })

    it('should render with display-none when mouse is out', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} />)
      wrapper.setProps(setState(props, { hasMouseOver: false }))
      expect(wrapper.props().wrapperClassName).to.contain('display-none')
    })

    it('should render with display-none when block is not editable', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} editable={false} />)
      const newProps = setProps(props, { editable: false })
      wrapper.setProps(setState(newProps, { hasMouseOver: true }))
      expect(wrapper.props().wrapperClassName).to.contain('display-none')
    })

    it('should render DropdownMenuItems', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} />)
      const items = wrapper.find('DropdownMenuItem')
      expect(items).to.have.length(5)
    })

    it('should render DropdownMenu when mouse is over', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} />)
      const newProps = setProps(props, { editable: true })
      wrapper.setProps(setState(newProps, { hasMouseOver: true }))
      expect(wrapper.props().wrapperClassName).to.not.contain('display-none')
    })

    it('should disable move up menu item when canMoveUp is false', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} />)
      wrapper.setProps(setProps(props, { canMoveUp: false }))
      expect(wrapper.find('DropdownMenuItem').at(3).props().disabled).to.be.true
    })

    it('should not disable move up menu item when canMoveUp is true', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} />)
      wrapper.setProps(setProps(props, { canMoveUp: true }))
      expect(wrapper.find('DropdownMenuItem').at(3).props().disabled).to.be.false
    })

    it('should disable move down menu item when canMoveDown is false', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} />)
      wrapper.setProps(setProps(props, { canMoveDown: false }))
      expect(wrapper.find('DropdownMenuItem').at(4).props().disabled).to.be.true
    })

    it('should not disable move down menu item when canMoveDown is true', () => {
      wrapper = shallow(<BlockDropdownMenu {...props} canMoveDown />)
      wrapper.setProps(setProps(props, { canMoveDown: true }))
      expect(wrapper.find('DropdownMenuItem').at(4).props().disabled).to.be.false
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

const setProps = (props, next) => ({
  ...props,
  props: {
    ...props.props,
    ...next
  }
})

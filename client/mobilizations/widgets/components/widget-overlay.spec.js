import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'

import { WidgetOverlay } from '../components'

describe('app/modules/widgets/components/widget-overlay', () => {
  let component
  let props = {
    children: []
  }

  before(() => {
    component = mount(<WidgetOverlay {...props} />)
  })

  context('when editable is true', () => {
    before(() => {
      component.setProps({ editable: true })
    })

    it('should render overlay div if mouseEnter', () => {
      component.simulate('mouseEnter')
      expect(component.find('div.widget-overlay').length).to.equal(1)
    })

    it('should not render overlay div if mounseLeave', () => {
      component.setState({ hasMouseOver: true })
      component.simulate('mouseLeave')
      expect(component.find('div.overlay').length).to.equal(0)
    })

    it('should render children', () => {
      component = mount(<WidgetOverlay><div className='teste'>dassa</div></WidgetOverlay>)
      expect(component.find('.teste').length).to.equal(1)
    })

    it('should render overlay div inside widget block', () => {
      expect(component.find('.relative').length).to.equal(1)
    })

    it('should call onClick when clicked overlay', () => {
      let clicked = false
      component.setProps({
        onClick: () => { clicked = true }
      })
      component.simulate('click')
      expect(clicked).to.equal(true)
    })
  })
})

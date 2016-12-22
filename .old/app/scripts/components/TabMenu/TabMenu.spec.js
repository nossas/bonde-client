import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'

import TabMenu from './TabMenu'

describe('TabMenu', () => {
  let wrapper
  let props = {
    title: 'Foo Bar Title!',
  }

  before(() => {
    wrapper = mount(
      <TabMenu {...props}>
        <div id="foo">Foo div children</div>
        <span id="bar">Bar span children</span>
      </TabMenu>
    )
  })

  describe('#render', () => {
    context('html', () => {
      it('should render one <div>.bg-white component wrapper', () => {
        expect(wrapper.find('.bg-white').length).to.equal(1)
      })
      it('should render one <h2> title', () => {
        expect(wrapper.find('h2').length).to.equal(1)
      })
      it('should render <h2> with passed title prop', () => {
        expect(wrapper.find('h2').text()).to.equal(props.title)
      })
      it('should render one <ul> list', () => {
        expect(wrapper.find('ul').length).to.equal(1)
      })
    })

    context('childrens', () => {
      it('should render one #foo children', () => {
        expect(wrapper.find('#foo').length).to.equal(1)
      })
      it('should render one #bar children', () => {
        expect(wrapper.find('#bar').length).to.equal(1)
      })
    })
  })
})

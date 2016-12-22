import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import { Menu } from './../components'
import * as Paths from './../../../../Paths'

describe('FormWidget/components/Menu', () => {
  let props = {
    mobilization: {},
    widget: {},
    location: {}
  }

  describe('tabs', () => {
    it('should render 1 <Tabs /> component', () => {
      const wrapper = shallow(<Menu {...props} />)
      expect(wrapper.find('Tabs')).to.have.length(1)
    })
    it('should render 4 <Tab /> in childrens', () => {
      const wrapper = shallow(<Menu {...props} />)
      expect(wrapper.find('Tab')).to.have.length(4)
    })
  })

  context('when active menu with pathname equals location', () => {
    const dummyId = 1
    props.mobilization.id = dummyId
    props.widget.id = dummyId

    it('should active tab Campos do formulário (fields settings)', () => {
      props.location.pathname = Paths.fieldsMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<Menu {...props} />)
      let node = wrapper.find('Tabs Tab').at(0)
      expect(node.props().isActive).to.equals(true)
    })

    it('should active tab Ajustes (form settings)', () => {
      props.location.pathname = Paths.formMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<Menu {...props} />)
      let node = wrapper.find('Tabs Tab').at(1)
      expect(node.props().isActive).to.equals(true)
    })

    it('should active tab Mensagem agradecimento (autofire)', () => {
      props.location.pathname = Paths.autofireMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<Menu {...props} />)
      let node = wrapper.find('Tabs Tab').at(2)
      expect(node.props().isActive).to.equals(true)
    })
  })
})

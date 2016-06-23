import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import * as Paths from '../Paths'
import ConfigurationsMenu from './ConfigurationsMenu'



describe('ConfigurationsMenu', () => {
  /* TabMenuItem index */
  let props = {
    mobilization: { id: 1 },
    location: {}
  }

  let expectedMenuItems = [
    {
      index: 0,
      text: 'Informações básicas',
      path: Paths.basicsMobilization(props.mobilization.id)
    },
    {
      index: 1,
      text: 'Cidade',
      path: Paths.cityMobilization(props.mobilization.id)
    },
    {
      index: 2,
      text: 'Compartilhamento',
      path: Paths.sharingMobilization(props.mobilization.id)
    },
    {
      index: 3,
      text: 'Google Analytics',
      path: Paths.analyticsMobilization(props.mobilization.id)
    },
    {
      index: 4,
      text: 'Domínio',
      path: Paths.customDomainMobilization(props.mobilization.id)
    }
  ]

  it('should render 5 <TabMenuItem />', () => {
    let wrapper = shallow(<ConfigurationsMenu {...props}/>)
    expect(wrapper.find('TabMenuItem').length).to.equal(5)
  })

  it('should render itens with label and path correct', () => {
    let wrapper = shallow(<ConfigurationsMenu {...props}/>)
    expectedMenuItems.map((expected) => {
      let node = wrapper.find('TabMenuItem').at(expected.index)
      expect(node.props().text).to.equal(expected.text)
      expect(node.props().path).to.equal(expected.path)
    })
  })

  it('should active item with path equals location.pathname', () => {
    expectedMenuItems.map((expected) => {
      // set props for ConfigurationsMenu with path expected item
      props.location.pathname = expected.path

      let wrapper = shallow(<ConfigurationsMenu {...props}/>)
      let node = wrapper.find('TabMenuItem').at(expected.index)

      expect(node.props().isActive).to.equal(true)
    })
  })
})

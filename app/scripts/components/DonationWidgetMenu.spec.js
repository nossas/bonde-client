import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import * as Path  from './../Paths'
import DonationWidgetMenu from './DonationWidgetMenu'


describe('DonationWidgetMenu', () => {
  let props = {
    mobilization: { id: 1 },
    widget: { id: 1 },
    location: {}
  }

  let expectedMenuItems = [
    {
      index: 0,
      text: 'Ajustes',
      path: Path.donationMobilizationWidget(props.mobilization.id, props.widget.id)
    },
    {
      index: 1,
      text: 'Mensagem agradecimento',
      path: Path.autofireMobilizationWidget(props.mobilization.id, props.widget.id)
    }
  ]

  it('should render 2 TabMenuItem', () => {
    let wrapper = shallow(<DonationWidgetMenu {...props} />)
    expect(wrapper.find('TabMenuItem').length).to.equal(2)
  })

  it('should render items with label and path correct', () => {
    let wrapper = shallow(<DonationWidgetMenu {...props} />)
    expectedMenuItems.map((expected) => {
      let node = wrapper.find('TabMenuItem').at(expected.index)
      expect(node.props().text).to.equal(expected.text)
      expect(node.props().path).to.equal(expected.path)
    })
  })

  it('should active item with path equals location.pathname', () => {
    expectedMenuItems.map((expected) => {
      // set props for DonationWidgetMenu with path expected item
      props.location.pathname = expected.path

      let wrapper = shallow(<DonationWidgetMenu {...props}/>)
      let node = wrapper.find('TabMenuItem').at(expected.index)

      expect(node.props().isActive).to.equal(true)
    })
  })
})

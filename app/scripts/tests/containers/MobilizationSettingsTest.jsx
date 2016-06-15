import React from 'react'
import TestUtils from 'react-addons-test-utils'
import MobilizationSettings from './../../containers/MobilizationSettings'
import ConfigurationsMenu from './../../components/ConfigurationsMenu'

import stubRouterContext from './../stubRouterContext'
const mobilization = {}
const location = ''

describe('MobilizationSettings', () => {
  it('should render MobilizationMenu', () => {
    const children = <div>Test</div>

    const WrapedComponent = stubRouterContext(MobilizationSettings, {
      mobilization: mobilization,
      location: location,
      children: children
    })

    const component = TestUtils.renderIntoDocument(<WrapedComponent />)

    expect(
      TestUtils.scryRenderedComponentsWithType(component, ConfigurationsMenu)
    ).to.have.length(1)
  })
})

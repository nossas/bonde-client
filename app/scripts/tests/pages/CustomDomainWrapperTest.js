import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { CustomDomainWrapper } from '../../pages/CustomDomainWrapper/CustomDomainWrapper'
import ShowMobilization from '../../pages/ShowMobilization'

describe('CustomDomainWrapper', () => {
  const props = {
    blocks: {data: []},
    widgets: {data: []},
    mobilizations: {data: []},
    auth: {},
    dispatch: () => {}
  }

  it('should not render ShowMobilization when there is no mobilization', () => {
    const component = TestUtils.renderIntoDocument(<CustomDomainWrapper {...props} />)
    const divs = TestUtils.scryRenderedComponentsWithType(component, ShowMobilization)
    expect(divs.length).to.be.eql(0)
  })

  it('should render ShowMobilization when there is a mobilization', () => {
    const component = TestUtils.renderIntoDocument(
      <CustomDomainWrapper {...props} mobilizations={{data: [{id: 1}]}} />
    )

    const divs = TestUtils.scryRenderedComponentsWithType(component, ShowMobilization)
    expect(divs.length).to.be.eql(1)
  })
})

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import BackgroundContainer from '~routes/authenticated/external/container'

describe('routes/application/container', () => {
  let wrapper = shallow(
    <BackgroundContainer>
      <h1>Foo Bar</h1>
    </BackgroundContainer>
  )

  it('render without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('should render a zendesk widget component', () => {
    expect(wrapper.find('ZendeskWidget')).to.have.length(1)
  })
})

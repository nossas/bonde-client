import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Container from '~routes/admin/container'

describe('routes/application/container', () => {
  let wrapper = shallow(
    <Container>
      <h1>Foo Bar</h1>
    </Container>
  )

  it('render without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('should render a zendesk widget component', () => {
    expect(wrapper.find('ZendeskWidget')).to.have.length(1)
  })

  it('should render a google fonts component', () => {
    expect(wrapper.find('GoogleFontsLoader')).to.have.length(1)
  })
})

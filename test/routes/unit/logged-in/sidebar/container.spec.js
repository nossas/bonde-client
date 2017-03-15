import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import ApplicationContainer from '~routes/authenticated/container'

const setup = (props = {}) => {
  const initialProps = {
    loading: false,
    relationshipId: undefined,
    asyncFetch: () => {},
    sidebarProps: {
      user: {},
      community: {},
      mobilization: {}
    },
    children: (<h1>Foo bar</h1>),
    ...props
  }

  return {
    props: initialProps,
    wrapper: shallow(
      <ApplicationContainer {...initialProps} />
    )
  }
}

describe('routes/application/container', () => {
  it.skip('render without crashed', () => {
    const { wrapper } = setup()
    expect(wrapper).to.be.ok
  })

  // it('render <Loading /> if loading is true', () => {
  //   const { wrapper } = setup({ loading: true })
  //   expect(wrapper.find('Loading').length).to.equal(1)
  // })

  it.skip('render <Sidebar /> and children if loading is false', () => {
    const { wrapper } = setup()
    expect(wrapper.find('Sidebar').length).to.equal(1)
  })

  it('should render a zendesk widget component', () => {
    const { wrapper } = setup()
    expect(wrapper.find('ZendeskWidget')).to.have.length(1)
  })
})

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { MobilizationDashboardContainer } from './mobilization-dashboard-container'

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
    ...props
  }

  return {
    props: initialProps,
    wrapper: mount(<MobilizationDashboardContainer {...initialProps} />)
  }
}

describe('<MobilizationDashboardContainer />', () => {
/*  it('render without crashed', () => {
    const { wrapper } = setup()
    expect(wrapper).to.be.ok
  }) */

  it('render <Loading /> if loading is true', () => {
    const { wrapper } = setup({ loading: true })
    expect(wrapper.find('Loading').length).to.equal(1)
  })

/*  it('render <Sidebar /> and children if loading is false', () => {
    const { wrapper } = setup()
    expect(wrapper.find('Sidebar').length).to.equal(1)
  }) */
})

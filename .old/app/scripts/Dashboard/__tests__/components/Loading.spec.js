import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { Loading } from '../../components'


describe('<Loading />', () => {

  it('renders without crashing', () => {
    const loading = mount(<Loading />)
    expect(loading).to.be.ok
  })
})

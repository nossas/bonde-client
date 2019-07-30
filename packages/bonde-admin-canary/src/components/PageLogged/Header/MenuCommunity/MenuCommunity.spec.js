import React from 'react'
import { shallow } from 'enzyme'
import MenuCommunity from './MenuCommunity'
import { Flexbox } from 'bonde-styleguide'
import { expect } from 'chai'

describe('components > PageLogged > Header > MenuCommunity > MenuCommunity', () => {
  let node
  beforeEach(() => {
    node = shallow(<MenuCommunity />)
  })

  it('render a Flexbox component', () => {
    expect(node.find(Flexbox)).to.be.lengthOf(1)
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import MenuCommunity from './MenuCommunity'
import { Flexbox } from 'bonde-styleguide'
import {
  IconBot,
  IconSettings,
  IconPage,
  IconChart
} from './icons'
import { expect } from 'chai'

describe('components > PageLogged > Header > MenuCommunity > MenuCommunity', () => {
  const items = [
    { name: 'chart', path: '/', icon: <IconChart color='white' /> },
    { name: 'pages', path: '/', icon: <IconPage color='white' /> },
    { name: 'chatbot', path: `/admin/${1}/chatbot`, icon: <IconBot color='white' /> },
    { name: 'settings', path: '/', icon: <IconSettings color='white' /> }
  ]

  let node
  beforeEach(() => {
    const props = { items }
    node = shallow(<MenuCommunity {...props} />)
  })

  it('render a Flexbox component', () => {
    expect(node.find(Flexbox)).to.be.lengthOf(1)
  })
})

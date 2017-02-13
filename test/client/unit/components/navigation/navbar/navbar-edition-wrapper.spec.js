import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { NavbarEditionWrapper } from '~components/navigation/navbar'

const block = {}
const mobilization = {}
const auth = {}
const dispatch = () => {}

const rawComponent = (
  <NavbarEditionWrapper
    block={block}
    mobilization={mobilization}
    auth={auth}
    dispatch={dispatch}
  />
)

describe('client/components/navigation/navbar/navbar-edition-wrapper', () => {
  it('should render form when its in the edit mode', () => {
    const wrapper = shallow(rawComponent)
    wrapper.setState({ isEditing: true })
    expect(wrapper.find('NavbarForm')).to.have.length(1)
  })

  it('should render button when its not in the edit mode', () => {
    const wrapper = shallow(rawComponent)
    wrapper.setState({ isEditing: false })
    expect(wrapper.html()).to.have.string('navbar-button')
  })
})

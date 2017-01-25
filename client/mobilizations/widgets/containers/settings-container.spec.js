import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { SettingsContainer } from './settings-container'

describe('app/modules/widgets/containers/settings-container', () => {
  const props = {
    mobilization: { id: 1 },
    widget: { id: 1 }
  }

  it('should render children with props received', () => {
    const wrapper = mount(
      <SettingsContainer {...props}>
        <span>Hello World!</span>
      </SettingsContainer>
    )
    expect(wrapper.find('span').props().widget).to.deep.equal({ id: 1 })
    expect(wrapper.find('span').props().mobilization).to.deep.equal({ id: 1 })
  })
})

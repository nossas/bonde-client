import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

// Current module dependencies
import { SettingsContainer } from '~mobilizations/widgets/containers/settings-container'

describe('client/mobilizations/widgets/containers/settings-container', () => {
  const props = {
    mobilization: { id: 1 },
    widget: { id: 1 }
  }

  it('should render children with props received', () => {
    const wrapper = shallow(
      <SettingsContainer {...props}>
        <span>Hello World!</span>
      </SettingsContainer>
    )
    expect(wrapper.find('span').props().widget).to.deep.equal({ id: 1 })
    expect(wrapper.find('span').props().mobilization).to.deep.equal({ id: 1 })
  })
})

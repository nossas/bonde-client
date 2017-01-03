import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import * as Paths from '../../../Paths'

import { Settings } from '../../containers/SettingsContainer'

describe('app/scripts/Widget/containers/SettingsContainer', () => {
  let settings
  const props = {
    mobilization: { id: 1 },
    widget: { id: 1 }
  }

  beforeEach(() => {
    settings = mount(<Settings {...props} />)
  })

  it('should render children with props received', () => {
    const wrapper = mount(
      <Settings {...props}>
        <span>Hello World!</span>
      </Settings>
    )
    expect(wrapper.find('span').props().widget).to.deep.equal({ id: 1 })
    expect(wrapper.find('span').props().mobilization).to.deep.equal({ id: 1 })
  })
})

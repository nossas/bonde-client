import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { DraftWidgetButton } from '~widget-plugins/draft/components'

describe('client/mobilizations/widgets/__plugins__/draft/components/draft-widget-button', () => {
  let wrapper
  const props = {
    label: 'label',
    icon: 'icon',
    onClick: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<DraftWidgetButton {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})

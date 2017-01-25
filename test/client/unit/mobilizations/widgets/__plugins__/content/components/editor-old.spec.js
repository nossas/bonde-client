import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { EditorOld } from '~widget-plugins/content/components'

describe('client/mobilizations/widgets/__plugins__/content/components/editor-old', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {
      settings: {
        content: ''
      }
    },
    editable: true,
    onEdit: mock.noop,
    onCancelEdit: mock.noop,
    dispatch: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<EditorOld {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})

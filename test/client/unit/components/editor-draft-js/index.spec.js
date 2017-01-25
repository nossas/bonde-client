import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import EditorDraftJS from '~components/editor-draft-js'

describe('client/components/editor-draft-js/index', () => {
  let wrapper
  const props = {
    handleSave: () => {},
    readOnly: false,
    value: 'Foo bar',
    theme: 'theme'
  }

  beforeAll(() => {
    wrapper = shallow(<EditorDraftJS {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})

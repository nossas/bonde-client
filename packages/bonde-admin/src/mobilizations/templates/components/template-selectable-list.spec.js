/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'

import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { TemplateSelectableList } from 'mobilizations/templates/components'

describe('client/mobilizations/templates/components/template-selectable-list', () => {
  let wrapper
  const props = {
    templates: [{ id: 1 }, { id: 2 }],
    filterableTemplates: [],
    selectedIndex: 1,
    setSelectedIndex: () => {},
    handleSelectItem: () => {}
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<TemplateSelectableList {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TemplateSelectableList } from '~client/mobilizations/templates/components'

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
    wrapper = shallow(<TemplateSelectableList {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})

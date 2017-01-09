import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as Paths from '../../../../../Paths'
import { ChoicesPage } from '../../pages'

describe('Match/pages/ChoicesPage', () => {
  let wrapper

  let props = {
    params: { widget_id: '1' },
    auth: { credentials: {} },
    dispatch: () => {},
    mobilization: { id: 1 },
    widgets: { data: [{ id: 1, settings: {} }] },
    location: { pathname: Paths.matchChoicesMobilizationWidget(1, 1) }
  }

  const _context = {
    router: {
      makeHref: sinon.stub(),
      isActive: sinon.stub()
    }
  }

  beforeEach(() => {
    wrapper = shallow(<ChoicesPage {...props} />, { context: _context })
  })

  describe('#render', () => {
    it('should render two <AddChoiceForm> components', () => {
      expect(wrapper.find('AddChoiceForm')).to.have.length(2)
    })

    it('should render one <MatchPage> component', () => {
      expect(wrapper.find('MatchPage')).to.have.length(1)
    })
  })

  describe('#widget', () => {
    before(() => {
      ChoicesPage.prototype.props = props
    })

    after(() => {
      ChoicesPage.prototype.props = undefined
    })

    it('should return current widget object', () => {
      let result = ChoicesPage.prototype.widget(props)
      let expectedWidget = props.widgets.data[0]
      expect(result).to.deep.equal(expectedWidget)
    })
    it('should return current widget object if not pass any param', () => {
      let result = ChoicesPage.prototype.widget()
      let expectedWidget = props.widgets.data[0]
      expect(result).to.deep.equal(expectedWidget)
    })
  })

  describe('#validate', () => {
    it('should render error when submit form and title_text empty', () => {
      props.widgets = {
        data: [{
          id: 1, settings: { 'title_text': '', 'choices1': '1', 'choicesA': 'A' }
        }]
      }
      wrapper = shallow(<ChoicesPage {...props} />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(1)
    })

    it('should render error when submit form and side a empty', () => {
      props.widgets = {
        data: [{
          id: 1,
          settings: { 'title_text': 'lorem', 'choices1': '', 'choicesA': 'A' }
        }]
      }
      wrapper = shallow(<ChoicesPage {...props} />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(1)
    })

    it('should render error when submit form and side b is empty', () => {
      props.widgets = {
        data: [{
          id: 1,
          settings: { 'title_text': 'lorem', 'choices1': '1', 'choicesA': '' }
        }]
      }
      wrapper = shallow(<ChoicesPage {...props} />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(1)
    })

    it('should render all the errors when submit form and empty states', () => {
      props.widgets = {
        data: [{id: 1, settings: {}}]
      }
      wrapper = shallow(<ChoicesPage {...props} />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(3)
    })
  })
})

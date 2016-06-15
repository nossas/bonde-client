import React from 'react'
import TestUtils from 'react-addons-test-utils'
import WYSIHTMLToolbar from './../../components/WYSIHTMLToolbar.jsx'

let component

describe('WYSIHTMLToolbar', function() {
  before(() => {
    component = TestUtils.renderIntoDocument(
      <WYSIHTMLToolbar elementId='some-id' className='some-class' />
    )
  })

  describe('#render', () => {
    it('should set the element id', () => {
      const divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
      expect(divs[0].getAttribute('id')).to.be.eql('some-id')
    })

    it('should set the element classes', () => {
      const divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
      expect(divs[0].getAttribute('class')).to.be.eql('some-class')
    })
  })
})

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Loading } from './../../components'

let component

describe('Progress', () => {
  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <Loading />
    )
  })

  describe('#render', () => {
    it('should render divs', () => {
      const containers = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
      expect(containers.length).to.equal(2)
    })

    it('should render icon', () => {
      const containers = TestUtils.scryRenderedDOMComponentsWithTag(component, 'i')
      expect(containers.length).to.equal(1)
    })
  })
})

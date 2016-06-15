import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { BlockMiniature } from './../../components'
import { BLOCK_LAYOUTS } from './../../constants/BlockLayouts'

let layout, component

describe('BlockMiniature', () => {
  describe('#render', () => {
    before(() => {
      layout = [
        {sm_size: 12, md_size: 12, lg_size: 6},
        {sm_size: 12, md_size: 12, lg_size: 6}
      ]

      component = TestUtils.renderIntoDocument(
        <BlockMiniature layout={layout} selectedLayout={layout} />
      )
    })

    it('should render a layout miniature', () => {
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(component, "col-6")
      ).to.have.length(2)
    })

    it('should be active if it is the selected layout', () => {
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(component, "is-active")
      ).to.have.length(1)
    })
  })
})

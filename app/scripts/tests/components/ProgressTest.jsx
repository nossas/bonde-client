import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Progress } from './../../components'

describe('Progress', () => {
  describe('#render', () => {
    it('should render unselected and bind onClick event', () => {
      const component = TestUtils.renderIntoDocument(
        <Progress className="foobar" percent={34} />
      )

      expect(
        component.refs.progress.getAttribute('class')
      ).to.eql('foobar')

      expect(
        component.refs.progress.getAttribute('style')
      ).to.eql('width:34%;')
    })
  })
})

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { DropDownMenuItem } from './../../components'

let component
let clickString

const onClick = () => { clickString = clickString + 'bar' }
const onItemClick = () => { clickString = 'foo' }
const props = {disabled: false, onClick: onClick, onItemClick: onItemClick}

describe('DropDownMenuItem', () => {
  describe('#handleClick', () => {
    beforeEach(() => {
      clickString = null
    })

    it('should call both onItemClick and onClick when not disabled', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} />
      )
      const event = { preventDefault () {}}
      component.handleClick(event)
      expect(clickString).to.be.equal('foobar')
    })

    it('should not call onItemClick or onClick when disabled', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} disabled />
      )
      const event = { preventDefault () {}}
      component.handleClick(event)
      expect(clickString).to.be.null
    })
  })

  describe('#render', () => {
    it('should render enabled and bind onClick event', () => {
      const handleClick = sandbox.spy()
      component = TestUtils.renderIntoDocument(<DropDownMenuItem {...props} onClick={handleClick} />)

      const link = TestUtils.findRenderedDOMComponentWithTag(component, 'a')
      TestUtils.Simulate.click(link)

      expect(link.getAttribute('disabled')).to.be.null
      expect(handleClick).to.have.been.calledOnce
    })

    it('should render disabled', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} disabled />
      )
      const link = TestUtils.findRenderedDOMComponentWithTag(component, 'a')
      expect(link.getAttribute('disabled')).not.to.be.null
    })
  })
})

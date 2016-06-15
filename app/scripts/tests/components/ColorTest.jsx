import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Color } from './../../components'

let component

const onClick = () => true
const props = {bgClass: 'bg-black', selectedClass: 'bg-white', onClick: onClick.bind(component)}

describe('Color', () => {
  describe('#render', () => {
    it('should render unselected and bind onClick event', () => {
      component = TestUtils.renderIntoDocument(
        <Color {...props} />
      )
      const container = ReactDOM.findDOMNode(component).childNodes[0]
      expect(container.getAttribute('style')).to.be.null
      expect(component.props.onClick.toString()).to.equal(onClick.bind(component).toString())
    })

    it('should render selected', () => {
      component = TestUtils.renderIntoDocument(
        <Color {...props} selectedClass={'bg-black'} />
      )
      const container = ReactDOM.findDOMNode(component).childNodes[0]
      expect(container.getAttribute('style')).to.contain('box-shadow')
    })
  })
})

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import { FacebookShareButton } from './../../components'

describe('FacebookShareButton', () => {
  it('should open a popup on click', () => {
    const component = TestUtils.renderIntoDocument(
      <FacebookShareButton href='http://meurio.org.br' />
    )

    const button = ReactDOM.findDOMNode(component.refs.button)
    const stubOpen = sinon.spy()
    window.open = stubOpen

    TestUtils.Simulate.click(button)

    expect(stubOpen).to.have.been.calledWith(
      `http://www.facebook.com/sharer.php?u=http://meurio.org.br`,
      'Compartilhar no Facebook',
      'width=800,height=600'
    )
  })
})

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import { TwitterShareButton } from './../../components'

describe('TwitterShareButton', () => {
  it('should open a popup on click', () => {
    const component = TestUtils.renderIntoDocument(
      <TwitterShareButton href='http://meurio.org.br' text='Change the world!' />
    )

    const button = ReactDOM.findDOMNode(component.refs.button)
    const stubOpen = sinon.spy()
    window.open = stubOpen

    TestUtils.Simulate.click(button)
    const expectedText = encodeURIComponent('Change the world!')

    expect(stubOpen).to.have.been.calledWith(
      `https://twitter.com/intent/tweet?text=${expectedText}&url=http://meurio.org.br`,
      'Compartilhar no Twitter',
      'width=800,height=600'
    )
  })

  it('should render text that contains hashtag and at mention chars', () => {
    const component = TestUtils.renderIntoDocument(
      <TwitterShareButton href='http://meurio.org.br' text='Change the world! #foo @bar' />
    )

    const button = ReactDOM.findDOMNode(component.refs.button)
    const stubOpen = sinon.spy()
    window.open = stubOpen

    TestUtils.Simulate.click(button)
    const expectedText = encodeURIComponent('Change the world! #foo @bar')

    expect(stubOpen).to.have.been.calledWith(
      `https://twitter.com/intent/tweet?text=${expectedText}&url=http://meurio.org.br`,
      'Compartilhar no Twitter',
      'width=800,height=600'
    )
  })
})

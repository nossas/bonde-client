import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { FacebookShareButton } from '~components/share'

describe('client/components/share/facebook-share-button', () => {
  it('should open a popup on click', () => {
    const wrapper = shallow(<FacebookShareButton href='http://meurio.org.br' />)

    const stubOpen = sinon.spy()
    window.open = stubOpen

    wrapper.find('button').at(0).simulate('click')

    expect(stubOpen.calledWith(
      `http://www.facebook.com/sharer.php?u=http://meurio.org.br`,
      'Compartilhar no Facebook',
      'width=800,height=600'
    )).to.be.true
  })
})

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { NavbarButton } from './../../components'

let renderedComponent

const children = 'Hello world'
const className = 'class'
const targetId = 'targetId'
const scrollableId = 'scrollableId'

describe('NavbarButton', () => {
  describe('#handleClick', () => {
    // TODO: in order to test this method we should find a way to mock jquery,
    // or remove this dependency
  })

  describe('#render', () => {
    before(() => {
      const shallowRenderer = TestUtils.createRenderer()
      shallowRenderer.render(
        <NavbarButton
          className={className}
          targetId={targetId}
          scrollableId={scrollableId}>
          {children}
        </NavbarButton>
      )
      renderedComponent = shallowRenderer.getRenderOutput()
    })

    it('should render an anchor', () => {
      expect(renderedComponent.type).to.be.eql('a')
    })

    it('should add an onClick event listener to the anchor', () => {
      expect(renderedComponent.props.onClick).to.be.a('function')
    })
  })
})

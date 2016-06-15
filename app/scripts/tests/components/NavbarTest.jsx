import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Navbar, DropDownMenu } from './../../components'

const blocks = {data: [{}, {}, {}, {hidden: true}]}
const visibleBlocks = blocks.data.filter((b) => {return !b.hidden})
const auth = {}
const dispatch = () => {}

const mobilization = {
  color_scheme: 'my-color-scheme',
  header_font: 'my-header-font',
  body_font: 'my-header-font'
}

let navbarComponent

describe('Navbar', () => {
  before(() => {
    navbarComponent = TestUtils.renderIntoDocument(
      <Navbar
        blocks={blocks}
        mobilization={mobilization}
        auth={auth}
        dispatch={dispatch}
      />
    )
  })

  describe('#renderNavbarButtons', () => {
    it('should return one NavbarButton for each visible block', () => {
      const navbarButtons = navbarComponent.renderNavbarButtons(false)
      expect(navbarButtons).to.have.length(visibleBlocks.length)
    })
  })

  describe('#render', () => {
    it('should render a DropDownMenu', () => {
      expect(
        TestUtils.scryRenderedComponentsWithType(navbarComponent, DropDownMenu)
      ).to.have.length(1)
    })
  })
})

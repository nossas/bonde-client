import React from 'react'
import TestUtils from 'react-addons-test-utils'
import classnames from 'classnames'
import { Block, Navbar } from './../../components'
import * as EditMobilizationImport from './../../pages/EditMobilization.jsx'
import stubRouterContext from './../stubRouterContext'

const EditMobilization = EditMobilizationImport.WrappedComponent

const block1 = { position: 0, id: 1 }
const block2 = { position: 1, id: 2 }
const blocks = { data: [block1, block2], loaded: true }
const mobilization = { color_scheme: 'meurio-scheme' }
const widgets = { data: [] }
const dispatch = () => {}
const auth = {}

describe('EditMobilization', () => {
  let mobilizationEditor = { isEditingBlock: false }
  const WrappedComponent = stubRouterContext(EditMobilization, {
    mobilization: mobilization,
    blocks: blocks,
    widgets: widgets,
    dispatch: dispatch,
    mobilizationEditor: mobilizationEditor,
    auth: auth
  })

  let component = TestUtils.renderIntoDocument(<WrappedComponent />)

  describe('#render', () => {
    it('should render blocks', () => {
      const blocksComponents = TestUtils.scryRenderedComponentsWithType(component, Block)
      expect(blocksComponents).to.have.length(blocks.data.length)
    })

    it('should apply mobilization classes', () => {
      const { color_scheme } = mobilization
      const div = TestUtils.scryRenderedDOMComponentsWithClass(component, classnames(color_scheme))
      expect(div).to.have.length(1)
    })

    it('should render the navbar when it is not editing a block', () => {
      const navbarComponent = TestUtils.scryRenderedComponentsWithType(component, Navbar)
      expect(navbarComponent).to.have.length(1)
    })

    it('should not render the navbar when it is editing a block', () => {
      mobilizationEditor = { isEditingBlock: true }
      const EditMobilizationWithoutNavbar = stubRouterContext(EditMobilization, {
        mobilization: mobilization,
        blocks: blocks,
        widgets: widgets,
        dispatch: dispatch,
        mobilizationEditor: mobilizationEditor,
        auth: auth
      })

      component = TestUtils.renderIntoDocument(<EditMobilizationWithoutNavbar />)

      const navbarComponent = TestUtils.scryRenderedComponentsWithType(component, Navbar)
      expect(navbarComponent).to.have.length(0)
    })
  })
})

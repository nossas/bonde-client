import React from 'react/addons'
import { Block } from './../../components'
import * as EditMobilizationImport from './../../pages/EditMobilization.jsx'
import classnames from 'classnames'

const EditMobilization = EditMobilizationImport.WrappedComponent
const { TestUtils } = React.addons

let block1, block2, blocks, mobilization, dispatch

describe('EditMobilization', () => {
  before(() => {
    block1 = { position: 0, id: 1 }
    block2 = { position: 1, id: 2 }
    blocks = [block1, block2]
    mobilization = { color_scheme: "meurio-scheme", font_set: "brush-up" }
    dispatch = () => {}
  })

  describe('#render', () => {
    let component

    before(() => {
      component = TestUtils.renderIntoDocument(
        <EditMobilization mobilization={mobilization} blocks={blocks} widgets={[]} dispatch={dispatch} />
      )
    })

    it('should render blocks', () => {
      const blocksComponents = TestUtils.scryRenderedComponentsWithType(component, Block)
      expect(blocksComponents).to.have.length(blocks.length)
    })

    it('should apply mobilization classes', () => {
      const { color_scheme, font_set } = mobilization
      const div = TestUtils.scryRenderedDOMComponentsWithClass(component, classnames(color_scheme, font_set))
      expect(div).to.have.length(1)
    })
  })
})

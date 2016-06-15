import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { ColorPicker, Color } from './../../components'

let component

const onClick = () => { alert('color was clicked!') }

describe('ColorPicker', () => {
  before(() => {
    component = TestUtils.renderIntoDocument(
      <ColorPicker selectedClass={'bg-white'} onClick={onClick.bind(component)} colorScheme={'nossascidades'} />
    )
  })

  describe('#renderColors', () => {
    it('should render with passed colors and bind onClick event', () => {
      const colors = component.renderColors.call(component, ['foo', 'bar'])
      expect(colors).to.have.length(2)
      expect(colors[0].props.bgClass).to.equal('foo')
      expect(colors[1].props.bgClass).to.equal('bar')
      expect(colors[0].props.onClick.toString()).to.equal(onClick.bind(component).toString())
      expect(colors[1].props.onClick.toString()).to.equal(onClick.bind(component).toString())
    })
  })

  describe('#render', () => {
    it('should render with all colors', () => {
      const colorComponents = TestUtils.scryRenderedComponentsWithType(component, Color)
      expect(colorComponents).to.have.length(40)
    })
  })
})

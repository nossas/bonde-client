import React from 'react'
import { shallow } from 'enzyme'
import {
  BondeDiagram,
  BondeDiagramApplication
} from '../lib'

describe('Diagram tests', () => {
  let defaultProps = {}
  let diagram = undefined
  
  beforeEach(() => {
    defaultProps = { app: new BondeDiagramApplication() }
    diagram = shallow(<BondeDiagram {...defaultProps} />)
  })

  it('renders DiagramWidget.srd-bonde-diagram', () => {
    expect(diagram.find('DiagramWidget.srd-bonde-diagram').length).toEqual(1)
  })

  it('pass app engine to DiagramWidget', () => {
    const widgetProps = diagram.find('DiagramWidget').props()
    expect(widgetProps.diagramEngine)
      .toEqual(defaultProps.app.getDiagramEngine())
  })
})
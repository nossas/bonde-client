import React from 'react'
import { shallow } from 'enzyme'
import {
  DraggableItem
} from '../lib/components'

describe('DraggableItem tests', () => {
  let defaultProps = {}
  let item = undefined
  
  beforeEach(() => {
    defaultProps = { children: <div className='srd-draggable--children' /> }
    item = shallow(<DraggableItem {...defaultProps} />)
  })

  it('renders DraggableItem children', () => {
    expect(item.find('.srd-draggable--children').length).toEqual(1)
  })

  it('call onDragStart with params (model, event)', () => {
    let modelExpected = null
    let eventExpected = null
    
    const props = {
      model: { kind: 'ask' },
      onDragStart: (model, event) => {
        modelExpected = model
        eventExpected = event
      }
    }

    const event = { target: {} }
    item.setProps(props)
    item.find('.draggable-item').props().onDragStart(event)

    expect(eventExpected).toEqual(event)
    expect(modelExpected).toEqual(props.model)
  })
})
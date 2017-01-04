import { expect } from 'chai'

import reducer from '../reducer'

import { SUCCESS_FILL_WIDGET } from '../actions'


describe('WidgetReducers', () => {

  it('should add count in success fill widget', () => {
    // state while requesting
    const globalState = {
      data: [
        { id: 1, settings: {} }
      ],
      saving: true
    }
    const action = { type: SUCCESS_FILL_WIDGET, counter: { id: 1, count: 2 } }
    const nextState = reducer(globalState, action)

    expect(nextState).to.deep.equal({
      data: [
        { id: 1, settings: {}, count: 2, filled: true }
      ],
      saving: false
    })
  })
})

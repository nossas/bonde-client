import { expect } from 'chai'

// Current module dependencies
import reducers, { initialState } from '~widget-plugins/pressure/reducers'
import { createAction } from '~widget-plugins/pressure/action-creators/create-action'
import * as t from '~widget-plugins/pressure/action-types'

describe('client/mobilizations/widgets/__plugins__/pressure/reducers', () => {
  it('should change saving state to true when requesting', () => {
    const action = { type: t.WIDGET_PRESSURE_FILL_REQUEST }
    const nextState = reducers(initialState, action)

    expect(nextState).to.have.property('saving', true)
  })
  it('should change saving state to false and filled state to true when succeeded', () => {
    // state while requesting
    const currentInitialState = { ...initialState, saving: true, filled: false }
    const action = { type: t.WIDGET_PRESSURE_FILL_SUCCESS }
    const nextState = reducers(currentInitialState, action)

    expect(nextState).to.have.property('saving', false)
    expect(nextState).to.have.property('filled', true)
  })
  it('should change saving state to false and error state with message when failed', () => {
    // state while requesting
    const currentInitialState = { ...initialState, saving: true, filled: false }
    const failurePayload = { error: 'Pressure widget fill request error message!' }
    const action = createAction(t.WIDGET_PRESSURE_FILL_FAILURE, failurePayload)
    const nextState = reducers(currentInitialState, action)

    expect(nextState).to.have.property('saving', false)
    expect(nextState)
      .to.have.property('error')
      .that.is.an('object')
      .that.deep.equals(failurePayload)
  })
})

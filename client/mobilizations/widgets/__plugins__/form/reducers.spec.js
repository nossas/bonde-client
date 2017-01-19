import { expect } from 'chai'

import reducers, { initialState } from './reducers'
import { createAction } from './action-creators/create-action'
import * as t from './action-types'

describe('app/modules/widgets/__plugins__/form/reducers', () => {
  it('should return the initial state by default', () => {
    expect(reducers()).to.deep.equal(initialState)
  })
  it('should change saving state to true when requesting', () => {
    const action = { type: t.WIDGET_FORM_ENTRY_CREATE_REQUEST }
    const nextState = reducers(initialState, action)

    expect(nextState).to.have.property('saving', true)
  })
  it('should change saving state to false when succeeded', () => {
    const currentInitialState = { ...initialState, saving: true }
    const action = { type: t.WIDGET_FORM_ENTRY_CREATE_SUCCESS }
    const nextState = reducers(currentInitialState, action)

    expect(nextState).to.have.property('saving', false)
  })
  it('should change saving state to false and error state with message when failed', () => {
    const currentInitialState = { ...initialState, saving: true }
    const failurePayload = { error: 'Form widget entry create request error message!' }
    const action = createAction(t.WIDGET_FORM_ENTRY_CREATE_FAILURE, failurePayload)
    const nextState = reducers(currentInitialState, action)

    expect(nextState).to.have.property('saving', false)
    expect(nextState)
      .to.have.property('error')
      .that.is.an('object')
      .that.deep.equals(failurePayload)
  })
})

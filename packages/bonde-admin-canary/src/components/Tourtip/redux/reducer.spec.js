import * as actionTypes from './actionTypes'
import reducer from './reducer'
import { expect } from 'chai'

it('NEXT_STEP in last STEP should reset tour', () => {
  const initialState = {
    total: 2,
    currentStep: 2,
    show: true
  }
  const action = { type: actionTypes.NEXT_STEP }
  const nextState = reducer(initialState, action)
  expect(nextState.currentStep).to.be.equal(1)
})

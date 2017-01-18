import { expect } from 'chai'

import * as t from './action-types'
import { createAction } from './action-creators/create-action'
import reducers, { initialState } from './reducers'

describe('app/modules/mobilizations/reducers', () => {
  let payload
  let nextState

  describe('t.ADD', () => {
    beforeEach(() => {
      payload = { id: 1, name: 'Lorem', goal: 'Dolor sit' }
      nextState = reducers(undefined, { type: t.ADD, payload })
    })

    it('should insert payload in data list', () => {
      expect(nextState.data).to.deep.equal([...initialState.data, payload])
    })

    it('should set current mobilization', () => {
      expect(nextState.currentId).to.equal(payload.id)
    })
  })

  describe('t.FETCH', () => {
    beforeEach(() => {
      nextState = reducers(undefined, { type: t.FETCH })
    })

    it('should change loading to true', () => {
      expect(nextState.loading).to.equal(true)
    })

    it('should reset data and current mobilization', () => {
      expect(nextState.data).to.deep.equal([])
      expect(nextState.currentId).to.equal(undefined)
    })
  })

  describe('t.LOAD', () => {
    beforeEach(() => {
      payload = [
        { id: 1, name: 'Lorem', goal: 'Dolor caem' },
        { id: 2, name: 'Sit', goal: 'Spsum inte' }
      ]
      nextState = reducers(undefined, { type: t.LOAD, payload })
    })

    it('should load payload in data', () => {
      expect(nextState.data).to.deep.equal(payload)
    })

    it('should finish fetching', () => {
      expect(nextState.loading).to.equal(false)
      expect(nextState.isLoaded).to.equal(true)
    })
  })

  describe('t.SELECT', () => {
    beforeEach(() => {
      payload = 1
      nextState = reducers(undefined, { type: t.SELECT, payload })
    })

    it('should set current mobilization', () => {
      expect(nextState.currentId).to.equal(payload)
    })
  })

  describe('t.UPDATE', () => {
    beforeEach(() => {
      payload = { id: 1, name: 'Replaced' }
      nextState = reducers(undefined, { type: t.LOAD, payload: [{ id: 1, name: 'Lorem' }] })
      nextState = reducers(nextState, { type: t.UPDATE, payload })
    })

    it('should replace payload in data list', () => {
      expect(nextState.data).to.deep.equal([payload])
    })
  })

  describe('t.TOGGLE_MENU', () => {
    beforeEach(() => {
      payload = 1
      nextState = reducers(undefined, { type: t.TOGGLE_MENU, payload })
    })

    it('should menuActiveIndex to open menu', () => {
      expect(nextState.menuActiveIndex).to.equal(payload)
    })

    it('should remove menuActiveIndex when equals previous index', () => {
      nextState = reducers(nextState, { type: t.TOGGLE_MENU, payload })
      expect(nextState.menuActiveIndex).to.equal(undefined)
    })
  })

  describe('t.ASYNC_FILTER_REQUEST', () => {
    it('should change loading state to true', () => {
      const action = { type: t.ASYNC_FILTER_REQUEST }
      const nextState = reducers(initialState, action)

      expect(nextState).to.have.property('loading', true)
    })
  })
  describe('t.ASYNC_FILTER_SUCCESS', () => {
    let currentInitialState
    let responsePayload
    before(() => {
      currentInitialState = { ...initialState, loading: true, isLoaded: false }
      responsePayload = [{ id: 1 }]
    })

    it('should change loading state to false', () => {
      const action = createAction(t.ASYNC_FILTER_SUCCESS, responsePayload)
      const nextState = reducers(currentInitialState, action)
      expect(nextState).to.have.property('loading', false)
    })

    it('should change isLoaded state to true', () => {
      const action = createAction(t.ASYNC_FILTER_SUCCESS, responsePayload)
      const nextState = reducers(currentInitialState, action)
      expect(nextState).to.have.property('isLoaded', true)
    })

    it('should change data state with array of objects', () => {
      const action = createAction(t.ASYNC_FILTER_SUCCESS, responsePayload)
      const nextState = reducers(currentInitialState, action)
      expect(nextState)
        .to.have.property('data')
        .that.is.an('array')
        .that.deep.equals(responsePayload)
    })
  })
  describe('t.ASYNC_FILTER_FAILURE', () => {
    let currentInitialState
    let failurePayload
    before(() => {
      currentInitialState = { ...initialState, loading: true, isLoaded: false }
      failurePayload = 'Form widget entry create request error message!'
    })

    it('should change loading state to false', () => {
      const action = createAction(t.ASYNC_FILTER_FAILURE, failurePayload)
      const nextState = reducers(currentInitialState, action)
      expect(nextState).to.have.property('loading', false)
    })

    it('should change error state with error message', () => {
      const action = createAction(t.ASYNC_FILTER_FAILURE, failurePayload)
      const nextState = reducers(currentInitialState, action)
      expect(nextState).to.have.property('error', failurePayload)
    })
  })
})

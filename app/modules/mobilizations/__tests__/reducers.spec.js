import { expect } from 'chai'

import * as t from '../action-types'
import reducer from '../reducers'

const initialState = {
  loading: false,
  isLoaded: false,
  data: [],
  relationshipId: undefined,
  currentId: undefined
}

describe('MobilizationsReducers', () => {
  describe('#asyncFilter', () => {
    it('should loading request', () => {
      const action = { type: t.REQUEST_FILTER }
      const nextState = reducer(undefined, action)

      expect(nextState).to.deep.equal({
        ...initialState,
        loading: true
      })
    })

    it('should loaded finish request with success', () => {
      const data = [{ id: 1 }]
      const action = { type: t.SUCCESS_FILTER, data }
      const nextState = reducer(undefined, action)

      expect(nextState).to.deep.equal({
        ...initialState,
        loading: false,
        isLoaded: true,
        data
      })
    })
  })

  describe('#asyncFetch', () => {
    it('shoud loading request with relationshipId', () => {
      const relationshipId = 1
      const action = { type: t.REQUEST_FETCH, relationshipId }
      const nextState = reducer(undefined, action)

      expect(nextState).to.deep.equal({
        ...initialState,
        loading: true,
        relationshipId
      })
    })

    it('should loaded finish request with success', () => {
      const data = [{ id: 1 }]
      const action = { type: t.SUCCESS_FETCH, data }
      const nextState = reducer(undefined, action)

      expect(nextState).to.deep.equal({
        ...initialState,
        loading: false,
        isLoaded: true,
        data
      })
    })
  })

  describe('#select', () => {
    it('should set currentId in mobilizations store', () => {
      const currentId = 1
      const action = { type: t.SELECT, currentId }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({
        ...initialState,
        currentId
      })
    })
  })
})

import { expect } from 'chai'

import { REQUEST_FETCH_BLOCKS, SUCCESS_FETCH_BLOCKS, FAILURE_FETCH_BLOCKS } from '../BlockActions'

import reducer from '../BlockReducer'


describe('BlockReducer', () => {

  it('should load blocks in data', () => {
    const action = {
      type: SUCCESS_FETCH_BLOCKS,
      result: [
        { id: 1 }
      ]
    }
    const nextState = reducer(undefined, action)
    expect(nextState).to.deep.equal({
      loaded: true,
      loading: false,
      data: [ { id: 1 } ]
    })
  })
})

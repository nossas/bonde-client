import { expect } from 'chai'

import { createAction } from './action-creators/create-action'
import { constants as c } from '../../mobilizations/blocks'
import reducers, { initialState } from '../../mobilizations/blocks/reducers'

describe('BlockReducer', () => {

  it('should load blocks in data', () => {
    const action = createAction(c.SUCCESS_ASYNC_BLOCK_FETCH, [{ id: 1 }])
    const nextState = reducers(undefined, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      loaded: true,
      data: [{ id: 1 }]
    })
  })

  describe('START_EDITING_BLOCK', () => {
    it('should return `editionMode` true', () => {
      const action = createAction(c.BLOCK_EDITION_MODE, true)
      const newState = reducers(null, action)
      expect(newState.editionMode).to.be.true
    })
  })

  describe('STOP_EDITING_BLOCK', () => {
    it('should return `editionMode` false', () => {
      const action = createAction(c.BLOCK_EDITION_MODE, false)
      const newState = reducers(null, action)
      expect(newState.editionMode).to.be.false
    })
  })

  describe.skip('BlockReducers', () => {
    before(() => {
      _initialState = {
        data: [
          { id: 1, bg_color: 'bg-1' },
          { id: 2, bg_color: 'bg-2' },
          { id: 3, bg_color: 'bg-3' }
        ]
      }
    })

    describe('FETCH_BLOCKS', () => {
      it('should return the mobilizations', () => {
        const action = {
          type: c.FETCH_BLOCKS,
          blocks: [{id: 1}, {id: 2}]
        }
        const newState = BlockReducers(_initialState, action)
        expect(newState).to.eql(action.blocks)
      })
    })

    describe('EDIT_BLOCK', () => {
      it('should return the mobilizations with edited block', () => {
        const action = {
          type: c.EDIT_BLOCK,
          block: {id: 1, bg_color: 'bg-foo'}
        }
        const newState = BlockReducers(_initialState, action)
        expect(newState.data).to.eql([
          { id: 1, bg_color: 'bg-foo' },
          { id: 2, bg_color: 'bg-2' },
          { id: 3, bg_color: 'bg-3' }
        ])
      })
    })

    describe('MOVE_BLOCK_UP', () => {
      it('should return the mobilizations with new order', () => {
        const action = {
          type: c.MOVE_BLOCK_UP,
          block: {id: 2, bg_color: 'bg-2'}
        }
        const newState = BlockReducers(_initialState, action)
        expect(newState.data).to.eql([
          { id: 2, bg_color: 'bg-2' },
          { id: 1, bg_color: 'bg-1' },
          { id: 3, bg_color: 'bg-3' }
        ])
      })
    })

    describe('MOVE_BLOCK_DOWN', () => {
      it('should return the mobilizations with new order', () => {
        const action = {
          type: c.MOVE_BLOCK_DOWN,
          block: {id: 2, bg_color: 'bg-2'}
        }
        const newState = BlockReducers(_initialState, action)
        expect(newState.data).to.eql([
          { id: 1, bg_color: 'bg-1' },
          { id: 3, bg_color: 'bg-3' },
          { id: 2, bg_color: 'bg-2' }
        ])
      })
    })

    describe('REMOVE_BLOCK', () => {
      it('should return the mobilizations without removed block', () => {
        const action = {
          type: c.REMOVE_BLOCK,
          block: {id: 2}
        }
        const newState = BlockReducers(_initialState, action)
        expect(newState.data).to.eql([
          { id: 1, bg_color: 'bg-1' },
          { id: 3, bg_color: 'bg-3' }
        ])
      })
    })
  })
})

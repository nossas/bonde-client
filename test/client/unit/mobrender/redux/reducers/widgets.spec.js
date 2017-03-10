import { expect } from 'chai'
import * as t from '~client/mobrender/redux/action-types'
import reducer, { initialState } from '~client/mobrender/redux/reducers/widgets'

describe('~client/mobrender/redux/reducers/widgets', () => {
  describe('doing fetch', () => {
    it('request', () => {
      const action = { type: t.FETCH_WIDGETS_REQUEST }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        ...initialState,
        fetching: true
      })
    })

    it('success', () => {
      const requestState = {...initialState,
        fetching: true
      }
      const data = [
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' }
      ]
      const action = { type: t.FETCH_WIDGETS_SUCCESS, payload: data }
      const nextState = reducer(requestState, action)
      expect(nextState).to.deep.equal({...requestState,
        isLoaded: true,
        fetching: false,
        data
      })
    })

    it('failure', () => {
      const requestState = {...initialState,
        fetching: true
      }
      const error = '500 Internal Server Error'
      const action = { type: t.FETCH_WIDGETS_FAILURE, payload: error }
      const nextState = reducer(requestState, action)
      expect(nextState).to.deep.equal({...requestState,
        isLoaded: true,
        fetching: false,
        error
      })
    })
  })

  describe('doing update', () => {
    const fetchState = {...initialState,
      isLoaded: true,
      data: [
        { id: 1, kind: 'draft' },
        { id: 2, kind: 'draft' }
      ]
    }

    const fetchRequestState = {...fetchState,
      saving: true
    }

    it('request', () => {
      const action = { type: t.UPDATE_WIDGET_REQUEST }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal(fetchRequestState)
    })

    it('success', () => {
      const widget = { id: 1, kind: 'content' }
      const action = { type: t.UPDATE_WIDGET_SUCCESS, payload: widget }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        data: fetchRequestState.data.map(w => {
          if (w.id === widget.id) return widget
          else return w
        })
      })
    })

    it('failure', () => {
      const error = '500 Internal Server Error'
      const action = { type: t.UPDATE_WIDGET_FAILURE, payload: error }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        error
      })
    })
  })

  describe('doing add widgets', () => {
    it('success', () => {
      const fetchState = {...initialState,
        isLoaded: true,
        data: [
          { id: 1, kind: 'draft', block_id: 2 },
          { id: 2, kind: 'draft', block_id: 2 }
        ]
      }
      const payload = [ { id: 3, kind: 'draft', block_id: 3 } ]
      const action = { type: t.ADD_WIDGETS_SUCCESS, payload }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal({...fetchState,
        data: [...fetchState.data, ...payload]
      })
    })
  })
})

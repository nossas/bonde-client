import { expect } from 'chai'

// Current module dependencies
import { createAction } from '~mobilizations/blocks/action-creators/create-action'
import c from '~mobilizations/blocks/constants'
import reducers, { initialState } from '~mobilizations/blocks/reducers'

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

  describe('FETCH', () => {
    describe('request', () => {
      let newState
      let action

      beforeAll(() => {
        action = { type: c.REQUEST_ASYNC_BLOCK_FETCH }
        newState = reducers(initialState, action)
      })
      it('should set loading property to true', () => {
        expect(newState)
          .to.have.property('loading')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
      it('should set loaded property to false', () => {
        expect(newState)
          .to.have.property('loaded')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })

    describe('success', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.SUCCESS_ASYNC_BLOCK_FETCH,
          [{ id: 1 }, { id: 2 }]
        )
        newState = reducers(initialState, action)
      })
      it('should update the list of blocks', () => {
        expect(newState)
          .to.have.property('data')
          .that.is.an('array')
          .that.deep.equals(action.payload)
      })
      it('should set loading property to false', () => {
        expect(newState)
          .to.have.property('loading')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
      it('should set loaded property to true', () => {
        expect(newState)
          .to.have.property('loaded')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })

    describe('failure', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.FAILURE_ASYNC_BLOCK_FETCH,
          'Block fetch action failure'
        )
        newState = reducers(initialState, action)
      })
      it('should set error property with response message', () => {
        expect(newState)
          .to.have.property('error')
          .that.is.an('string')
          .that.deep.equals(action.payload)
      })
      it('should set loading property to false', () => {
        expect(newState)
          .to.have.property('loading')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
      it('should set loaded property to true', () => {
        expect(newState)
          .to.have.property('loaded')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })
  })

  describe('CREATE', () => {
    describe('request', () => {
      let newState
      let action

      beforeAll(() => {
        action = { type: c.REQUEST_ASYNC_BLOCK_CREATE }
        newState = reducers(initialState, action)
      })
      it('should set requesting property to true', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })

    describe('success', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.SUCCESS_ASYNC_BLOCK_CREATE,
          { id: 2 }
        )
        newState = reducers(initialState, action)
      })
      it('should update the list of blocks', () => {
        expect(newState)
          .to.have.property('data')
          .that.is.an('array')
          .that.deep.equals([action.payload])
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })

    describe('failure', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.FAILURE_ASYNC_BLOCK_FETCH,
          'Block create action failure'
        )
        newState = reducers(initialState, action)
      })
      it('should set error property with response message', () => {
        expect(newState)
          .to.have.property('error')
          .that.is.an('string')
          .that.deep.equals(action.payload)
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })
  })

  describe('UPDATE', () => {
    describe('request', () => {
      let newState
      let action

      beforeAll(() => {
        action = { type: c.REQUEST_ASYNC_BLOCK_UPDATE }
        newState = reducers(initialState, action)
      })
      it('should set requesting property to true', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })

    describe('success', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.SUCCESS_ASYNC_BLOCK_UPDATE,
          { id: 1, foo: 'bar' }
        )
        newState = reducers(setData(initialState, [{ id: 1 }]), action)
      })
      it('should update the list of blocks', () => {
        expect(newState)
          .to.have.property('data')
          .that.is.an('array')
          .that.deep.equals([action.payload])
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })

    describe('failure', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.FAILURE_ASYNC_BLOCK_UPDATE,
          'Block update action failure'
        )
        newState = reducers(initialState, action)
      })
      it('should set error property with response message', () => {
        expect(newState)
          .to.have.property('error')
          .that.is.an('string')
          .that.deep.equals(action.payload)
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })
  })

  describe('SELECT', () => {
    describe('request', () => {
      let newState
      let action

      beforeAll(() => {
        action = { type: c.REQUEST_ASYNC_BLOCK_SELECT }
        newState = reducers(initialState, action)
      })
      it('should set loaded property to false', () => {
        expect(newState)
          .to.have.property('loaded')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })

    describe('success', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.SUCCESS_ASYNC_BLOCK_SELECT,
          [{ id: 1 }, { id: 2 }, { id: 3 }]
        )
        newState = reducers(initialState, action)
      })
      it('should update the list of blocks', () => {
        expect(newState)
          .to.have.property('data')
          .that.is.an('array')
          .that.deep.equals(action.payload)
      })
      it('should set loaded property to true', () => {
        expect(newState)
          .to.have.property('loaded')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })

    describe('failure', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.FAILURE_ASYNC_BLOCK_SELECT,
          'Block select action failure'
        )
        newState = reducers(initialState, action)
      })
      it('should set error property with response message', () => {
        expect(newState)
          .to.have.property('error')
          .that.is.an('string')
          .that.deep.equals(action.payload)
      })
      it('should set loaded property to true', () => {
        expect(newState)
          .to.have.property('loaded')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })
  })

  describe('DESTROY', () => {
    describe('request', () => {
      let newState
      let action

      beforeAll(() => {
        action = { type: c.REQUEST_ASYNC_BLOCK_DESTROY }
        newState = reducers(initialState, action)
      })
      it('should set requesting property to true', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })

    describe('success', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.SUCCESS_ASYNC_BLOCK_DESTROY,
          { id: 2 }
        )
        newState = reducers(setData(initialState, [{ id: 1 }, { id: 2 }, { id: 3 }]), action)
      })
      it('should update the list of blocks', () => {
        expect(newState)
          .to.have.property('data')
          .that.is.an('array')
          .that.deep.equals([{ id: 1 }, { id: 3 }])
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })

    describe('failure', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.FAILURE_ASYNC_BLOCK_DESTROY,
          'Block select action failure'
        )
        newState = reducers(initialState, action)
      })
      it('should set error property with response message', () => {
        expect(newState)
          .to.have.property('error')
          .that.is.an('string')
          .that.deep.equals(action.payload)
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })
  })

  describe('MOVE UP', () => {
    describe('request', () => {
      let newState
      let action

      beforeAll(() => {
        action = { type: c.REQUEST_ASYNC_BLOCK_MOVE_UP }
        newState = reducers(initialState, action)
      })
      it('should set requesting property to true', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })

    describe('success', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.SUCCESS_ASYNC_BLOCK_MOVE_UP,
          { id: 2 }
        )
        newState = reducers(setData(initialState, [{ id: 1 }, { id: 2 }, { id: 3 }]), action)
      })
      it('should update the list of blocks', () => {
        expect(newState)
          .to.have.property('data')
          .that.is.an('array')
          .that.deep.equals([{ id: 2 }, { id: 1 }, { id: 3 }])
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })

    describe('failure', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.FAILURE_ASYNC_BLOCK_MOVE_UP,
          'Block select action failure'
        )
        newState = reducers(initialState, action)
      })
      it('should set error property with response message', () => {
        expect(newState)
          .to.have.property('error')
          .that.is.an('string')
          .that.deep.equals(action.payload)
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })
  })

  describe('MOVE DOWN', () => {
    describe('request', () => {
      let newState
      let action

      beforeAll(() => {
        action = { type: c.REQUEST_ASYNC_BLOCK_MOVE_DOWN }
        newState = reducers(initialState, action)
      })
      it('should set requesting property to true', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(true)
      })
    })

    describe('success', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.SUCCESS_ASYNC_BLOCK_MOVE_DOWN,
          { id: 2 }
        )
        newState = reducers(setData(initialState, [{ id: 1 }, { id: 2 }, { id: 3 }]), action)
      })
      it('should update the list of blocks', () => {
        expect(newState)
          .to.have.property('data')
          .that.is.an('array')
          .that.deep.equals([{ id: 1 }, { id: 3 }, { id: 2 }])
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })

    describe('failure', () => {
      let newState
      let action

      beforeAll(() => {
        action = createAction(
          c.FAILURE_ASYNC_BLOCK_MOVE_DOWN,
          'Block select action failure'
        )
        newState = reducers(initialState, action)
      })
      it('should set error property with response message', () => {
        expect(newState)
          .to.have.property('error')
          .that.is.an('string')
          .that.deep.equals(action.payload)
      })
      it('should set requesting property to false', () => {
        expect(newState)
          .to.have.property('requesting')
          .that.is.an('boolean')
          .that.deep.equals(false)
      })
    })
  })
})

const setData = (state, data) => ({
  ...state,
  data: [
    ...state.data,
    ...data
  ]
})

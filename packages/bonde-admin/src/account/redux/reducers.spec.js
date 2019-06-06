import { expect } from 'chai'
import authReducer, { initialState } from 'account/redux/reducers'
import * as t from 'account/redux/action-types'

describe('AuthReducer', () => {
  it('auth/LOAD_SUCCESS', () => {
    const action = { type: t.LOAD_SUCCESS }
    const nextState = authReducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      isLoaded: true,
      isLoading: false
    })
  })

  it('auth/SIGN_SUCCESS', () => {
    const payload = {
      user: { first_name: 'Lorem' },
      credentials: { key: 'lorem-ipsum-dolor.org' }
    }
    const action = { type: t.SIGN_SUCCESS, payload }
    const nextState = authReducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      isLoading: false,
      ...payload
    })
  })

  it('auth/UPDATE_USER_REQUEST', () => {
    const action = { type: t.UPDATE_USER_REQUEST }
    const nextState = authReducer(initialState, action)
    expect(nextState).to.deep.equal({...initialState,
      saving: true
    })
  })

  it('auth/UPDATE_USER_SUCCESS', () => {
    const requestState = { ...initialState, saving: true }

    const payload = { first_name: 'Foo', last_name: 'Bar', email: 'foo@bar.com' }
    const action = { type: t.UPDATE_USER_SUCCESS, payload }
    const nextState = authReducer(requestState, action)
    expect(nextState).to.deep.equal({...requestState,
      saving: false,
      user: payload
    })
  })

  it('auth/UPDATE_USER_FAILURE', () => {
    const requestState = { ...initialState, saving: true }

    const payload = '500 Internal Server Error'
    const action = { type: t.UPDATE_USER_FAILURE, payload }
    const nextState = authReducer(requestState, action)
    expect(nextState).to.deep.equal({...requestState,
      saving: false,
      error: payload
    })
  })
})

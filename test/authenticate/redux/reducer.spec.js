import { expect } from 'chai'
import authReducer from '~client/account/redux/reducers'
import * as t from '~client/account/redux/action-types'

const initialState = {
  isLoaded: false,
  isLoading: false,
  user: undefined,
  credentials: undefined,
  error: undefined
}

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

  it('auth/LOGIN_REQUEST', () => {
    const action = { type: t.LOGIN_REQUEST }
    const nextState = authReducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      isLoading: true
    })
  })

  it('auth/LOGIN_SUCCESS', () => {
    const payload = {
      user: { first_name: 'Lorem' },
      credentials: { key: 'lorem-ipsum-dolor.org' }
    }
    const action = { type: t.LOGIN_SUCCESS, payload }
    const nextState = authReducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      isLoading: false,
      ...payload
    })
  })

  it('auth/LOGIN_FAILURE', () => {
    const payload = {
      stack: 'Lorem ipsum'
    }
    const action = { type: t.LOGIN_FAILURE, payload }
    const nextState = authReducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      isLoading: false,
      error: payload
    })
  })

  it('auth/LOGOUT_SUCCESS', () => {
    const action = { type: t.LOGOUT_SUCCESS }
    const nextState = authReducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      isLoading: false,
      user: undefined,
      credentials: undefined
    })
  })
})

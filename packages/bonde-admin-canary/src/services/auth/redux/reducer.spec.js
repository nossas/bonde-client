import * as actionTypes from './actionTypes'
import authReducer from './reducer'
import { expect } from 'chai'

describe('services > auth > redux > reducer', () => {
  it('login user on reducer', () => {
    const user = { name: 'Test', jwtToken: 'abcdvfeqa' }
    const nextState = authReducer(undefined, {
      type: actionTypes.LOGIN,
      payload: user
    })

    expect(nextState.user).to.be.equal(user)
  })

  it('logout user on reducer', () => {
    const user = { name: 'Test', jwtToken: 'abcdvfeqa' }
    const nextState = authReducer({ user }, {
      type: actionTypes.LOGOUT
    })

    expect(nextState.user).to.be.equal(undefined)
  })
})

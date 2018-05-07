import test from 'ava'
import * as actionTypes from './actionTypes'
import authReducer from './reducer'

test('login user on reducer', t => {
  const user = { name: 'Test', jwtToken: 'abcdvfeqa' }
  const nextState = authReducer(undefined, {
    type: actionTypes.LOGIN,
    payload: user
  })

  t.is(nextState.user, user)
})

test('logout user on reducer', t => {
  const user = { name: 'Test', jwtToken: 'abcdvfeqa' }
  const nextState = authReducer({ user }, {
    type: actionTypes.LOGOUT
  })

  t.is(nextState.user, undefined)
})

import test from 'ava'
import { store } from '../redux'
import { db } from '../session'
import AuthAPI from './api'

test('save user in redux and session when login', t => {
  const user = { name: 'Test', jwtToken: 'abcdfg' }
  AuthAPI.login(user)
  t.is(user, store.getState().auth.user)
  t.is(user, db.get('user').value())
})

test('remove user in redux and session when logout', t => { 
  AuthAPI.login({ name: 'Test', jwtToken: 'abcdfg' }) // log user
  
  AuthAPI.logout()
  t.is(store.getState().auth.user, undefined)
  t.is(db.get('user').value(), undefined)
})

test('check if user is authenticated', t => {
  t.is(AuthAPI.isAuthenticated(), false)

  AuthAPI.login({ name: 'Test', jwtToken: 'abcdfg' })
  t.is(AuthAPI.isAuthenticated(), true)

  AuthAPI.logout()
  t.is(AuthAPI.isAuthenticated(), false)
})

test('get current user', t => {
  t.is(AuthAPI.getUser(), undefined)

  const user = { name: 'Test', jwtToken: 'abcdfg' }
  AuthAPI.login(user)
  t.is(AuthAPI.getUser(), user)

  AuthAPI.logout()
  t.is(AuthAPI.getUser(), undefined)
})

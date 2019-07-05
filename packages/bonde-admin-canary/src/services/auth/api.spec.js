import { store } from 'services/redux'
import { db } from 'services/session'
import AuthAPI from './api'
import { expect } from 'chai'

describe('services > auth > api', () => {
  it('save user in redux and session when login', () => {
    const user = { name: 'Test', jwtToken: 'abcdfg' }
    AuthAPI.login(user)
    expect(user).to.be.equal(store.getState().auth.user)
    expect(user).to.be.equal(db.get('user').value())
  })

  it('remove user in redux and session when logout', () => {
    AuthAPI.login({ name: 'Test', jwtToken: 'abcdfg' }) // log user
    AuthAPI.logout()
    expect(store.getState().auth.user).to.be.undefined
    expect(db.get('user').value()).to.be.undefined
  })

  it('check if user is authenticated', () => {
    expect(AuthAPI.isAuthenticated()).to.be.false
    AuthAPI.login({ name: 'Test', jwtToken: 'abcdfg' })
    expect(AuthAPI.isAuthenticated()).to.be.true
    AuthAPI.logout()
    expect(AuthAPI.isAuthenticated()).to.be.false
  })

  it('get current token', () => {
    expect(AuthAPI.getToken()).to.be.undefined
    const user = { jwtToken: 'abcdfg' }
    AuthAPI.login(user)
    expect(AuthAPI.getToken()).to.be.equal(user.jwtToken)
    AuthAPI.logout()
    expect(AuthAPI.getToken()).to.be.undefined
  })
})

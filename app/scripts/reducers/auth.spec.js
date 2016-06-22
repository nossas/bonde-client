import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE,
  AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL
} from './../constants/ActionTypes'
import auth, { initialState, isLoaded, load, login, logout } from './auth'

describe('AuthReducer', () => {
  const user = {
    id         : 1,
    email      : 'foo@bar.com',
    first_name : 'Foo',
    last_name  : 'Bar',
    uid        : 'foo@bar.com',
    provider   : 'email',
    avatar_url : null,
    thumb_url  : null
  }
  const credentials = {
    'Access-Token' : '6Aa2QCQcZiRBsxZWxlDsFQ',
    'Expirity'     : '1467729463',
    'Token-Type'   : 'Bearer',
    'Uid'          : 'foo@bar.com',
    'Client'       : 'yu7xtnV1rTHE2mvzmBJABg'
  }

  describe('#default', () => {
    it('should return initial state if it pass empty params', () => {
      expect(auth()).to.deep.equal(initialState)
    })
    it('should return initial state if it pass an undefined action type', () => {
      expect(auth(undefined, 'UNDEFINED_TYPE')).to.deep.equal(initialState)
    })
    it('should return an empty object if it pass an empty object and undefined action type', () => {
      const expected = {}
      expect(auth({}, 'UNDEFINED_TYPE')).to.deep.equal(expected)
    })
    it('should return the passed state object if it pass an undefined action type', () => {
      const expected = { foo: 'bar' }
      expect(auth({ foo: 'bar' }, 'UNDEFINED_TYPE')).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOAD', () => {
    const expectedDeps = { loading: true }
    const action = { type: AUTH_LOAD }

    it('should return `AUTH_LOAD` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOAD` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOAD_SUCCESS', () => {
    const actionDeps = { result: { user: user, credentials: credentials } }
    const expectedDeps = { ...actionDeps.result, loaded: true, loading: false }
    const action = { type: AUTH_LOAD_SUCCESS, ...actionDeps }

    it('should return `AUTH_LOAD_SUCCESS` state object', () => {
      const expected = { ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOAD_SUCCESS` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOAD_FAIL', () => {
    const actionDeps = { error: 'Foo Bar Error!' }
    const expectedDeps = { ...initialState, ...actionDeps, loading: false }
    const action = { type: AUTH_LOAD_FAIL, ...actionDeps }

    it('should return `AUTH_LOAD_FAIL` state object', () => {
      const expected = { ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOAD_FAIL` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOGIN_REQUEST', () => {
    const expectedDeps = { user: null, submitting: true, error: null }
    const action = { type: AUTH_LOGIN_REQUEST }

    it('should return `AUTH_LOGIN_REQUEST` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOGIN_REQUEST` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOGIN_SUCCESS', () => {
    const actionDeps = { user: user, credentials: credentials }
    const expectedDeps = {
      user: actionDeps.user,
      credentials: actionDeps.credentials,
      submitting: false,
      error: null
    }
    const action = { type: AUTH_LOGIN_SUCCESS, ...actionDeps }

    it('should return `AUTH_LOGIN_SUCCESS` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOGIN_SUCCESS` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOGIN_FAILURE', () => {
    const actionDeps = { error: 'Foo Bar Error!' }
    const expectedDeps = { user: null, submitting: false, error: actionDeps.error }
    const action = { type: AUTH_LOGIN_FAILURE, ...actionDeps }

    it('should return `AUTH_LOGIN_FAILURE` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOGIN_FAILURE` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOGOUT_REQUEST', () => {
    const expectedDeps = { submitting: true, error: null }
    const action = { type: AUTH_LOGOUT_REQUEST }

    it('should return `AUTH_LOGOUT_REQUEST` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOGOUT_REQUEST` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOGOUT_SUCCESS', () => {
    const expectedDeps = { user: null, submitting: false, error: null }
    const action = { type: AUTH_LOGOUT_SUCCESS }

    it('should return `AUTH_LOGOUT_SUCCESS` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOGOUT_SUCCESS` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#AUTH_LOGOUT_FAILURE', () => {
    const actionDeps = { error: 'Foo Bar Error!' }
    const expectedDeps = { submitting: false, ...actionDeps }
    const action = { type: AUTH_LOGOUT_FAILURE, ...actionDeps }

    it('should return `AUTH_LOGOUT_FAILURE` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(auth(undefined, action)).to.deep.equal(expected)
    })
    it('should return `AUTH_LOGOUT_FAILURE` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(auth(state, action)).to.deep.equal(expected)
    })
  })

  describe('#isLoaded', () => {
    it('should return `true` if it pass valid global state object', () => {
      const globalState = { auth: { loaded: true } }
      expect(isLoaded(globalState)).to.be.true
    })
    it('should return `false` if it pass valid global state object and false loaded prop', () => {
      const globalState = { auth: { loaded: false } }
      expect(isLoaded(globalState)).to.be.false
    })
    it('should return `false` if it not pass loaded prop', () => {
      const globalState = { auth: {} }
      expect(isLoaded(globalState)).to.be.false
    })
    it('should return `false` if it pass invalid global state object', () => {
      const globalState = {}
      expect(isLoaded(globalState)).to.be.false
    })
    it('should return `false` if it not pass param', () => {
      expect(isLoaded()).to.be.false
    })
  })

  describe('#load', () => {
    const loadStateObject = load()

    context('prop `types`', () => {
      it('validates if it `tyoes` prop exists', () => {
        expect(loadStateObject.types).to.exist
      })
      it('validates if it `types` prop is an array', () => {
        expect(loadStateObject.types).to.be.array
      })
      it('validates if it `types` have expected actions', () => {
        const expected = [AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL]
        expect(loadStateObject.types).to.have.members(expected)
      })
    })

    context('prop `promise`', () => {
      const client = { get: () => {} }

      before(() => {
        sinon.spy(client, 'get')
        loadStateObject.promise(client)
      })

      after(() => {
        client.get.restore()
      })

      it('validates if it `promise` prop exists', () => {
        expect(loadStateObject.promise).to.exist
      })
      it('validates if it `promise` prop is a function', () => {
        expect(loadStateObject.promise).to.be.func
      })
      it('validates if it `promise` calls get method', () => {
        expect(client.get.called).to.be.true
      })
      it('validates if it `promise` client get method class with correct param', () => {
        expect(client.get.calledWith('/loadAuth')).to.be.true
      })
    })
  })

  describe('#login', () => {
    const loginStateObject = login()

    context('prop `types`', () => {
      it('validates if it `tyoes` prop exists', () => {
        expect(loginStateObject.types).to.exist
      })
      it('validates if it `types` prop is an array', () => {
        expect(loginStateObject.types).to.be.array
      })
      it('validates if it `types` have expected actions', () => {
        const expected = [
          AUTH_LOGIN_REQUEST,
          AUTH_LOGIN_SUCCESS,
          AUTH_LOGIN_FAILURE
        ]
        expect(loginStateObject.types).to.have.members(expected)
      })
    })

    context('prop `promise`', () => {
      const client = { post: () => {} }

      before(() => {
        sinon.spy(client, 'post')
        loginStateObject.promise(client)
      })

      after(() => {
        client.post.restore()
      })

      it('validates if it `promise` prop exists', () => {
        expect(loginStateObject.promise).to.exist
      })
      it('validates if it `promise` prop is a function', () => {
        expect(loginStateObject.promise).to.be.func
      })
      it('validates if it `promise` calls post method', () => {
        expect(client.post.called).to.be.true
      })
      it('validates if it `promise` client post method class with correct param', () => {
        expect(client.post.calledWith('/login')).to.be.true
      })
    })
  })

  describe('#logout', () => {
    const logoutStateObject = logout()

    context('prop `types`', () => {
      it('validates if it `tyoes` prop exists', () => {
        expect(logoutStateObject.types).to.exist
      })
      it('validates if it `types` prop is an array', () => {
        expect(logoutStateObject.types).to.be.array
      })
      it('validates if it `types` have expected actions', () => {
        const expected = [
          AUTH_LOGOUT_REQUEST,
          AUTH_LOGOUT_SUCCESS,
          AUTH_LOGOUT_FAILURE
        ]
        expect(logoutStateObject.types).to.have.members(expected)
      })
    })

    context('prop `promise`', () => {
      const client = { get: () => {} }

      before(() => {
        sinon.spy(client, 'get')
        logoutStateObject.promise(client)
      })

      after(() => {
        client.get.restore()
      })

      it('validates if it `promise` prop exists', () => {
        expect(logoutStateObject.promise).to.exist
      })
      it('validates if it `promise` prop is a function', () => {
        expect(logoutStateObject.promise).to.be.func
      })
      it('validates if it `promise` calls get method', () => {
        expect(client.get.called).to.be.true
      })
      it('validates if it `promise` client get method class with correct param', () => {
        expect(client.get.calledWith('/logout')).to.be.true
      })
    })
  })
})

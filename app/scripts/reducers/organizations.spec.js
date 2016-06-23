import React from 'react'
import sinon from 'sinon'
import superagent from 'superagent'
import { expect } from 'chai'

import {
  REQUEST_FETCH_ORGANIZATIONS,
  SUCCESS_FETCH_ORGANIZATIONS,
  FAILURE_FETCH_ORGANIZATIONS
} from './../constants/ActionTypes'

import organizations, {
  initialState,
  isOrganizationsLoaded,
  fetchOrganizations
} from './organizations'

describe('OrganizationsReducer', () => {
  const state = {
    organizations: {
      loaded: false,
      editing: false,
      data: []
    }
  }

  describe('#default', () => {
    it('should return initial state if it pass empty params', () => {
      expect(organizations()).to.deep.equal(initialState)
    })
    it('should return initial state if it pass an undefined action type', () => {
      expect(organizations(undefined, 'UNDEFINED_TYPE')).to.deep.equal(initialState)
    })
    it('should return an empty object if it pass an empty object and undefined action type', () => {
      const expected = {}
      expect(organizations({}, 'UNDEFINED_TYPE')).to.deep.equal(expected)
    })
    it('should return the passed state object if it pass an undefined action type', () => {
      const expected = { foo: 'bar' }
      expect(organizations({ foo: 'bar' }, 'UNDEFINED_TYPE')).to.deep.equal(expected)
    })
  })

  describe('#REQUEST_FETCH_ORGANIZATIONS', () => {
    const expectedDeps = { loaded: false }
    const action = { type: REQUEST_FETCH_ORGANIZATIONS }

    it('should return `REQUEST_FETCH_ORGANIZATIONS` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(organizations(undefined, action)).to.deep.equal(expected)
    })
    it('should return `REQUEST_FETCH_ORGANIZATIONS` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(organizations(state, action)).to.deep.equal(expected)
    })
  })

  describe('#SUCCESS_FETCH_ORGANIZATIONS', () => {
    const actionDeps = { result: state.organizations }
    const expectedDeps = { data: actionDeps.result, loaded: true }
    const action = { type: SUCCESS_FETCH_ORGANIZATIONS, ...actionDeps }

    it('should return `SUCCESS_FETCH_ORGANIZATIONS` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(organizations(undefined, action)).to.deep.equal(expected)
    })
    it('should return `SUCCESS_FETCH_ORGANIZATIONS` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(organizations(state, action)).to.deep.equal(expected)
    })
  })

  describe('#FAILURE_FETCH_ORGANIZATIONS', () => {
    const expectedDeps = { loaded: true }
    const action = { type: FAILURE_FETCH_ORGANIZATIONS }

    it('should return `FAILURE_FETCH_ORGANIZATIONS` state object', () => {
      const expected = { ...initialState, ...expectedDeps }
      expect(organizations(undefined, action)).to.deep.equal(expected)
    })
    it('should return `FAILURE_FETCH_ORGANIZATIONS` state object filled with another state props', () => {
      const state = { foo: 'bar', bar: 'baz' }
      const expected = { ...state, ...expectedDeps }
      expect(organizations(state, action)).to.deep.equal(expected)
    })
  })

  describe('#isOrganizationsLoaded', () => {
    it('should return `true` if it pass valid global state object', () => {
      const globalState = { organizations: { loaded: true } }
      expect(isOrganizationsLoaded(globalState)).to.be.true
    })
    it('should return `false` if it pass valid global state object and false loaded prop', () => {
      const globalState = { organizations: { loaded: false } }
      expect(isOrganizationsLoaded(globalState)).to.be.false
    })
    it('should return `false` if it not pass loaded prop', () => {
      const globalState = { organizations: {} }
      expect(isOrganizationsLoaded(globalState)).to.be.false
    })
    it('should return `false` if it pass invalid global state object', () => {
      const globalState = {}
      expect(isOrganizationsLoaded(globalState)).to.be.false
    })
    it('should return `false` if it not pass param', () => {
      expect(isOrganizationsLoaded()).to.be.false
    })
  })

  describe('#fetchOrganizations', () => {
    const fetchOrganizationsObject = fetchOrganizations()

    context('prop `types`', () => {
      it('validates if it `tyoes` prop exists', () => {
        expect(fetchOrganizationsObject.types).to.exist
      })
      it('validates if it `types` prop is an array', () => {
        expect(fetchOrganizationsObject.types).to.be.array
      })
      it('validates if it `types` have expected actions', () => {
        const expected = [
          REQUEST_FETCH_ORGANIZATIONS,
          SUCCESS_FETCH_ORGANIZATIONS,
          FAILURE_FETCH_ORGANIZATIONS
        ]
        expect(fetchOrganizationsObject.types).to.have.members(expected)
      })
    })

    context('prop `promise`', () => {
      before(() => {
        sinon.spy(superagent, 'get')
      })

      after(() => {
        superagent.get.restore()
      })

      it('validates if it `promise` prop exists', () => {
        expect(fetchOrganizationsObject.promise).to.exist
      })
      it('validates if it `promise` prop is a function', () => {
        expect(fetchOrganizationsObject.promise).to.be.func
      })
      it('validates if it `promise` calls get method', () => {
        Promise.all([fetchOrganizationsObject.promise()])
        expect(superagent.get.called).to.be.true
      })
      it('validates if it `promise` client get method class with correct param', () => {
        Promise.all([fetchOrganizationsObject.promise()])
        expect(
          superagent.get.calledWith(`${process.env.API_URL}/organizations`)
        ).to.be.true
      })
    })
  })
})

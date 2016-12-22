import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import reducer, { handleError, showMatch, initialState, initialAction } from '../reducer'

describe('Matches Reducer', () => {
  let wrapper
  let sandbox
  let spy = {}

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#default', () => {
    it('should returns the initial state if it not passing any arguments', () => {
      expect(reducer()).to.be.deep.equal(initialState)
    })
    it('should returns the initial state if it passing undefined state', () => {
      expect(reducer(undefined)).to.be.deep.equal(initialState)
    })
    it('should returns the initial state if it passing unknown action type', () => {
      expect(reducer(undefined, 'FOO_BAR')).to.be.deep.equal(initialState)
    })
  })
})

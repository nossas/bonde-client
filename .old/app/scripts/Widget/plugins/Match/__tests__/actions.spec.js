import React from 'react'
import sinon from 'sinon'
import superagent from 'superagent'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import * as Paths from '../../../../Paths'
import { addActivistMatch } from '../actions'

describe('Match/actions', () => {
  let sandbox

  let params = {
    matchId: 1,
    activist: {
      name: 'Foo',
      email: 'foo@bar.com'
    }
  }

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  context('#addActivistMatch', () => {
    before(() => {
      sandbox.stub(superagent, 'post')
    })
    after(() => {
      sandbox.restore()
    })

    it('should return an object', () => {
      expect(addActivistMatch(params)).to.be.an.object
    })

    it('should calls superagent post method', () => {
      expect(superagent.post).to.have.been.called
    })

    it('should calls superagent send method', () => {
      expect(superagent.send).to.have.been.called
    })

    it('should calls superagent end method', () => {
      expect(superagent.end).to.have.been.called
    })
  })
})

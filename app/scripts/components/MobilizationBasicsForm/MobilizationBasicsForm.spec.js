import objectAssign from 'object-assign'
import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import MobilizationBasicsForm from './MobilizationBasicsForm.jsx'
import * as Paths from '../../Paths'

describe('MobilizationBasicsForm', () => {
  const state = {
    initializing: true,
    submitting: false,
    error: null,
    test: 'qqqq'
  }

  const props = {
    data: { name: '', goal: null },
    errors: {
      goal: 'Insira o objetivo da mobilização',
      name: 'Insira o nome da mobilização'
    },
    handleBlur: () => {},
    handleChange: () => {},
    touchAll: () => {},
    initializeForm: () => {},
    dirty: false,
    valid: false,
    store: {
      dispatch: sinon.spy(),
      getState: sinon.stub().returns(state),
      subscribe: sinon.spy()
    }
  }

  let wrapper

  describe('initial state rendering', () => {

    beforeEach(() => {
      wrapper = mount(<MobilizationBasicsForm { ...props } />)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    context('when it is waiting for initialization', () => {
      it('should render empty .bg-white div', () => {
        expect(wrapper.find('div.bg-white').length).to.equal(1)
      })
    })

    context('when component has received props and it is initialized', () => {
      before(() => {
        sinon.spy(MobilizationBasicsForm.prototype, 'componentWillReceiveProps')
      })
      after(() => {
        MobilizationBasicsForm.prototype.componentWillReceiveProps.restore()
      })

      beforeEach(() => {
        wrapper.setProps({ foo: 'bar' })
        wrapper.update()
      })

      it('should call `componentWillReceiveProps` method', () => {
        expect(
          MobilizationBasicsForm.prototype.componentWillReceiveProps.called
        ).to.be.true
      })
      it('should render form', () => {
        expect(wrapper.find('form').length).to.equal(1)
      })

      context('form elements', () => {
        it('should contains 2 `label`s inside form', () => {
          expect(wrapper.find('form label').length).to.equal(2)
        })
        it('should contains 2 `input`s inside form', () => {
          expect(wrapper.find('form input').length).to.equal(2)
        })
        it('should contains 1 `textarea` inside form', () => {
          expect(wrapper.find('form textarea').length).to.equal(1)
        })
      })
    })
  })
})

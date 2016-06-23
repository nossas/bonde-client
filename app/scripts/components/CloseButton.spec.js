import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import CloseButton from './CloseButton'


describe('CloseButton', () => {
  let props = {
    dirty: undefined,
    path: undefined
  }

  it('should render button with onClick', () => {
    let wrapper = shallow(<CloseButton {...props} />)
    let node = wrapper.find('button').at(0)
    expect(node.props().onClick).to.be.ok
  })

  describe('when window.confirm is true', () => {

    it('should confirm message when dirty properties is true', () => {
      let spy = sinon.spy(window, 'confirm')

      props.dirty = true
      let wrapper = shallow(<CloseButton {...props} />)

      let node = wrapper.find('button').at(0)
      node.simulate('click')

      expect(window.confirm.calledOnce).to.equal(true)
      spy.restore()
    })

    it('should call transitionTo if props.path exists', () => {
      let stub = sinon.stub(window, 'confirm')
      stub.returns(true)

      props.dirty = true
      props.path = '/'

      let context = {
        router: {
          transitionTo: sinon.spy()
        }
      }
      let wrapper = shallow(<CloseButton {...props} />, { context })
      let node = wrapper.find('button').at(0)
      node.simulate('click')

      stub.restore()

      expect(wrapper.context().router.transitionTo.calledOnce).to.equal(true)
    })

    it('should call goBack if props.path not exists', () => {
      let stub = sinon.stub(window, 'confirm')
      stub.returns(true)

      props.path = undefined
      let context = {
        router: {
          goBack: sinon.spy()
        }
      }
      let wrapper = shallow(<CloseButton {...props} />, { context })
      let node = wrapper.find('button').at(0)
      node.simulate('click')

      stub.restore()

      expect(wrapper.context().router.goBack.calledOnce).to.equal(true)
    })
  })
})

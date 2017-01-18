import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { NavbarForm } from './../../components'

const handleCloseForm = () => {}
const mobilization = {}
const block = {name: 'My block'}
const blockUpdate = () => {}
const auth = {}

function generateComponent(options = {}) {
  return (
    <NavbarForm
      handleCloseForm={options.handleCloseForm || handleCloseForm}
      mobilization={options.mobilization || mobilization}
      block={options.block || block}
      blockUpdate={options.blockUpdate || blockUpdate}
      auth={options.auth || auth}
      defaultValue={block.name}
    />
  )
}

describe('NavbarForm', () => {
  it('should initialize state with a name', () => {
    const component = TestUtils.renderIntoDocument(generateComponent())
    expect(component.state.name).to.be.eq(block.name)
  })

  describe('#componentDidMount', () => {
    it('should add an event listenter for the window', () => {
      sinon.spy(window, 'addEventListener')
      TestUtils.renderIntoDocument(generateComponent())
      expect(window.addEventListener).to.have.been.calledOnce
    })
  })

  describe('#componentWillUnmount', () => {
    it('should remove an event listenter from the window', () => {
      sinon.spy(window, 'removeEventListener')
      const component = TestUtils.renderIntoDocument(generateComponent())
      component.componentWillUnmount()
      expect(window.removeEventListener).to.have.been.calledOnce
    })
  })

  describe('#handleKeyUp', () => {
    it('should call submit when ESC is pressed', () => {
      const component = TestUtils.renderIntoDocument(generateComponent())
      sinon.spy(component, 'submit')
      component.handleKeyUp({preventDefault: () => {}, keyCode: 27})
      expect(component.submit).to.have.been.calledOnce
    })
  })

  describe('#submit', () => {
    it('should dispatch the edit block action', () => {
      const mockedDispatch = sinon.spy()
      const component = TestUtils.renderIntoDocument(
        generateComponent({blockUpdate: mockedDispatch})
      )
      component.submit({preventDefault: () => {}})
      expect(mockedDispatch).to.have.been.calledOnce
    })

    it('should call close form callback', () => {
      const mockedHandleCloseForm = sinon.spy()
      const component = TestUtils.renderIntoDocument(
        generateComponent({handleCloseForm: mockedHandleCloseForm})
      )
      component.submit({preventDefault: () => {}})
      expect(mockedHandleCloseForm).to.have.been.calledOnce
    })
  })
})

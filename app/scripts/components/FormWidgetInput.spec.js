import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import FormWidgetInput from './FormWidgetInput'

describe('FormWidgetInput', () => {
  context('when render form edit input settings', () => {
    let props = {
      uid: '',
      initializeEditing: true,
      editable: true,
      configurable: true,
      mobilization: {
        body_font: ''
      }
    }

    before(() => {
      sinon.spy(FormWidgetInput.prototype, 'renderForm');
    })

    after(() => {
      FormWidgetInput.prototype.renderForm.restore()
    })

    it('should call renderForm when initialize editable', () => {
      let wrapper = shallow(<FormWidgetInput {...props} />)
      expect(FormWidgetInput.prototype.renderForm.calledOnce).to.equal(true)
    })
  })

  context('when render input form', () => {
    let props = {
      uid: '',
      initializeEditing: false,
      editable: true,
      configurable: true,
      mobilization: {
        body_font: ''
      }
    }

    before(() => {
      sinon.spy(FormWidgetInput.prototype, 'renderInput');
      sinon.spy(FormWidgetInput.prototype, 'renderInstructions');
      sinon.spy(FormWidgetInput.prototype, 'renderFieldKind');
    })

    after(() => {
      FormWidgetInput.prototype.renderInput.restore()
      FormWidgetInput.prototype.renderInstructions.restore()
      FormWidgetInput.prototype.renderFieldKind.restore()
    })

    it('should call renderInput, renderInstructions, renderFieldKind when not initialize editable', () => {
      props.field = { }

      let wrapper = shallow(<FormWidgetInput {...props} />)
      expect(FormWidgetInput.prototype.renderInput.calledOnce).to.equal(true)
      expect(FormWidgetInput.prototype.renderInstructions.calledOnce).to.equal(true)
      expect(FormWidgetInput.prototype.renderFieldKind.calledOnce).to.equal(true)
    })

    it('should render a select input when field kind equals dropdown', () => {
      props.field = { kind: 'dropdown', placeholder: '1,2,3' }

      let wrapper = shallow(<FormWidgetInput {...props} />)
      expect(wrapper.find('select')).to.have.length(1)
    })

    it('should render a input text when field kind not equals dropdown or greetings', () => {
      props.field = { kind: 'dummy', placeholder: '' }

      let wrapper = shallow(<FormWidgetInput {...props} />)
      expect(wrapper.find('input')).to.have.length(1)
    })

    it('should render success message when field kind equals greetings', () => {
      props.field = { kind: 'greetings', placeholder: 'new message' }

      let wrapper = shallow(<FormWidgetInput {...props} />)
      expect(wrapper.find('p')).to.have.length(1)

      let node = wrapper.find('p').at(0)
      expect(node.text()).to.have.string(props.field.placeholder)
    })

    it('should change hasMouseOver state for render link edit when mouseOver', () => {
      let wrapper = shallow(<FormWidgetInput {...props} />)

      wrapper.simulate('mouseEnter')
      expect(wrapper.state('hasMouseOver')).to.equals(true)

      wrapper.simulate('mouseLeave')
      expect(wrapper.state('hasMouseOver')).to.equals(false)
    })

    it('should editMode when click on block', () => {
      let wrapper = shallow(<FormWidgetInput {...props} />)
      wrapper.simulate('click')

      expect(wrapper.state('editing')).to.equals(true)
    })

    it('should not click to go edit mode when configurable is False', () => {
      props.configurable = false

      let wrapper = shallow(<FormWidgetInput {...props} />)
      wrapper.simulate('click')

      expect(wrapper.state('editing')).to.equals(false)
    })
  })
})

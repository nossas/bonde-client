import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import FormWidgetInputForm from './FormWidgetInputForm'


describe('FormWidgetInputForm', () => {

  context('#button', () => {
    /* Button sequence index */
    let btnIndex = {
      MOVE_UP: 0,
      MOVE_DOWN: 1,
      REMOVE: 2,
      CANCEL: 3,
      SAVE: 4
    }

    let props = {
      uid: 'form-1',
      field: {
        uid: 'field-1',
        kind: 'text',
        label: '',
        placeholder: '',
        required: false
      },
      mobilization: { id: 1 },
      auth: { credentials: {} },
      dispatch: () => {},
      widget: {
        id: 1,
        settings: {
          fields: [
            { uid: 'field-1' },
            { uid: 'field-2' },
          ]
        }
      }
    }

    describe('move up and down action', () => {

      beforeEach(() => {
        sinon.spy(props, 'dispatch')
      })

      afterEach(() => {
        props.dispatch.restore()
      })

      it('should disabled move up if canMoveUp props false', () => {
        props.canMoveUp = false

        let wrapper = shallow(<FormWidgetInputForm {...props} />)
        let node = wrapper.find('button').at(btnIndex.MOVE_UP)
        expect(node.props().disabled).to.equal(!props.canMoveUp)
      })

      it('should disabled move down if canMoveDown props false', () => {
        props.canMoveDown = false

        let wrapper = shallow(<FormWidgetInputForm {...props} />)
        let node = wrapper.find('button').at(btnIndex.MOVE_DOWN)
        expect(node.props().disabled).to.equal(!props.canMoveUp)
      })

      it('should call dispatch in EDIT_WIDGET action when move down', () => {
        let wrapper = shallow(<FormWidgetInputForm {...props} />)

        let node = wrapper.find('button').at(btnIndex.MOVE_DOWN)
        node.simulate('click')

        expect(props.dispatch.calledOnce).to.equal(true)
      })

      it('should call dispatch in EDIT_WIDGET action when move up', () => {
        let wrapper = shallow(<FormWidgetInputForm {...props} />)
        let node = wrapper.find('button').at(btnIndex.MOVE_UP)
        node.simulate('click')

        expect(props.dispatch.calledOnce).to.equal(true)
      })
    })

    describe('add and remove action', () => {

      beforeEach(() => {
        sinon.spy(props, 'dispatch')
      })

      afterEach(() => {
        props.dispatch.restore()
      })

      it('should disabled saved button when state.loading', () => {
        let wrapper = shallow(<FormWidgetInputForm {...props} />)
        wrapper.setState({'loading': true})

        let node = wrapper.find('button').at(btnIndex.SAVE)

        expect(node.props().disabled).to.equal(true)
      })

      it('should call dispatch in EDIT_WIDGET action when save', () => {
        let wrapper = shallow(<FormWidgetInputForm {...props} />)
        let node = wrapper.find('button').at(btnIndex.SAVE)
        node.simulate('click')

        expect(props.dispatch.calledOnce).to.equal(true)
      })

      describe('when cancel confirm dialog', () => {

        beforeEach(() => {
          sinon.stub(window, 'confirm')
          window.confirm.returns(false)

          sinon.spy(FormWidgetInputForm.prototype, 'updateSettings')
        })

        afterEach(() => {
          window.confirm.restore()
          FormWidgetInputForm.prototype.updateSettings.restore()
        })

        it('not should call updateSettings when clicked cancel', () => {
          let wrapper = shallow(<FormWidgetInputForm {...props} />)
          let node = wrapper.find('button').at(btnIndex.REMOVE)
          node.simulate('click')

          expect(FormWidgetInputForm.prototype.updateSettings.calledOnce).to.equal(false)
        })

        it('should open confirm popup when field changed and clicked out to form', () => {
          let wrapper = shallow(<FormWidgetInputForm {...props} />)
          wrapper.setState({label: 'changedLabel'})

          let node = wrapper.find('div.fixed.top-0').at(0)
          node.simulate('click')

          expect(window.confirm.called).to.equal(true)
        })
      })

      describe('when done confirm dialog', () => {

        beforeEach(() => {
          sinon.stub(window, 'confirm')
          window.confirm.returns(true)

          sinon.spy(FormWidgetInputForm.prototype, 'updateSettings')
          sinon.spy(FormWidgetInputForm.prototype, 'handleCancel')
        })

        afterEach(() => {
          window.confirm.restore()
          FormWidgetInputForm.prototype.updateSettings.restore()
          FormWidgetInputForm.prototype.handleCancel.restore()
        })

        it('should call dispatch in EDIT_WIDGET action when confirm remove', () => {
          let wrapper = shallow(<FormWidgetInputForm {...props} />)
          let node = wrapper.find('button').at(btnIndex.REMOVE)
          node.simulate('click')

          expect(props.dispatch.calledOnce).to.equal(true)
        })

        it('should reset changes and close form when clicked out form and confirm', () => {
          let wrapper = shallow(<FormWidgetInputForm {...props} />)
          wrapper.setState({label: 'changedLabel'})

          let node = wrapper.find('div.fixed.top-0').at(0)
          node.simulate('click')

          expect(FormWidgetInputForm.prototype.handleCancel.calledOnce).to.equal(true)
          expect(wrapper.state().label).to.equal(props.field.label)
        })
      })

      describe('when clicked cancel', () => {
        it('should reset changes and close form edit', () => {
          sinon.spy(FormWidgetInputForm.prototype, 'handleCancel')

          let wrapper = shallow(<FormWidgetInputForm {...props} />)
          wrapper.setState({label: 'changedLabel'})

          let node = wrapper.find('button').at(btnIndex.CANCEL)
          node.simulate('click')

          expect(FormWidgetInputForm.prototype.handleCancel.calledOnce).to.equal(true)
          expect(wrapper.state().label).to.equal(props.field.label)

          FormWidgetInputForm.prototype.handleCancel.restore()
        })
      })
    })
  })
})

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ContentWidget from './../../components/ContentWidget.jsx'
import classnames from 'classnames'

const mobilization = { header_font: 'ubuntu', body_font: 'open-sans' }
const widget = {settings: {content: 'Clique aqui para editar...'}}
let component

describe('ContentWidget', function() {
  const props = {
    widget: widget,
    editable: true,
    mobilization: mobilization,
    onEdit: () => {},
    onCancelEdit: () => {},
    dispatch: () => {},
    auth: {}
  }

  context('when it is editable', function() {
    before(function() {
      component = TestUtils.renderIntoDocument(<ContentWidget {...props} />)
    })

    describe('#enableEditor', function() {
      it('should set editing state to true', function() {
        component.enableEditor()
        expect(component.state.editing).to.be.eql(true)
      })

      it('should add a keyup event listener', function() {
        const mockedAddEventListener = sandbox.spy()
        sandbox.stub(window, 'addEventListener', mockedAddEventListener)
        component.enableEditor()

        mockedAddEventListener.should.have.been.called
      })
    })

    describe('#disableEditor', function() {
      it('should set editing state to false', function() {
        component.disableEditor()
        expect(component.state.editing).to.be.eql(false)
      })

      it('should remove the keyup event listener', function() {
        const mockedRemoveEventListener = sandbox.spy()
        sandbox.stub(window, 'removeEventListener', mockedRemoveEventListener)
        component.disableEditor()

        mockedRemoveEventListener.should.have.been.called
      })
    })

    describe('#handleEditorFocus', function() {
      it('should set state editing to true', function() {
        component.handleEditorFocus()
        expect(component.state.editing).to.be.eql(true)
      })
    })

    describe('#handleEscapePress', function() {
      it('should save the content if the keyCode is escape', function() {
        const mockedSave = sandbox.spy()
        sandbox.stub(component, 'save', mockedSave)
        component.handleEscapePress({keyCode: 27})

        mockedSave.should.have.been.called
      })
    })

    describe('#handleOverlayClick', function() {
      it('should save the content', function() {
        const mockedSave = sandbox.spy()
        sandbox.stub(component, 'save', mockedSave)
        component.handleOverlayClick()

        mockedSave.should.have.been.called
      })
    })

    describe('#render', function() {
      it('should apply mobilization classes', () => {
        const { header_font: headerFont, body_font: bodyFont } = mobilization
        const div = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          classnames(`${headerFont}-header`, `${bodyFont}-body`)
        )
        expect(div).to.have.length(1)
      })
    })
  })

  context('when it is not editable', function() {
    it('should not initialize editor when the widget is not editable', function() {
      component = TestUtils.renderIntoDocument(<ContentWidget {...props} editable={false} />)
      expect(component.state.editor).to.be.eql(null)
    })
  })
})

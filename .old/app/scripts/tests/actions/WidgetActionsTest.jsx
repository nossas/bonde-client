import { FETCH_WIDGETS } from '../../constants/ActionTypes'
import * as WidgetActions from './../../Widget/actions'
import { SUCCESS_EDIT_WIDGET } from './../../Widget/actions'
import $ from 'jquery'

describe('WidgetActions', () => {
  describe('#fetchMobilizations', () => {
    it('should GET widgets using correct URL and dispatch action', () => {
      const dispatch = sandbox.spy()
      WidgetActions.fetchWidgets({mobilization_id: 1})(dispatch)
      const request = requests[0]
      const widgets = [{id: 1}, {id: 2}]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/widgets`)
      expect(request.method).to.equal('GET')
      request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(widgets))
      expect(dispatch).to.have.been.calledWith({
        type: FETCH_WIDGETS,
        widgets
      })
    })
  })

  // describe('#editWidgetAsync', () => {
  //   it('should PUT widget using correct URL and dispatch action', () => {
  //     const dispatch = sandbox.spy()
  //     const widget = { id: 2, settings: {content: 'text'} }
  //     const params = { credentials: {}, mobilization_id: 1 }
  //     WidgetActions.editWidgetAsync(widget, params)(dispatch)
  //     const request = requests[0]
  //     expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/widgets/2`)
  //     expect(request.method).to.equal('PUT')
  //     expect(request.requestBody).to.equal(JSON.stringify({widget}))
  //     request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(widget))
  //     expect(dispatch).to.have.been.calledWith({
  //       type: SUCCESS_EDIT_WIDGET,
  //       widget
  //     })
  //   })
  // })
})

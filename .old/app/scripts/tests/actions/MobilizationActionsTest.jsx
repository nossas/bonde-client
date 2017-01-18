import { EDIT_MOBILIZATION } from '../../constants/ActionTypes'
import * as MobilizationActions from './../../actions/MobilizationActions'

let dispatch

describe('MobilizationActions', () => {
  before(() => {
    dispatch = sandbox.spy()
  })

  describe('#editMobilization', () => {
    let mobilization, params

    before(() => {
      mobilization = { google_analytics_code: 'UA-12345678' }
      params = { id: 1, mobilization: mobilization }
    })

    it('should request mobilizations/update in the API', () => {
      MobilizationActions.editMobilization(params)(dispatch)

      const request = requests[0]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1`)
      expect(request.method).to.equal('PUT')
      request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(params.mobilization))
    })

    it('should dispatch the edit action', () => {
      MobilizationActions.editMobilization(params)(dispatch)

      expect(dispatch).to.have.been.calledWith({
        type: EDIT_MOBILIZATION,
        mobilization: mobilization
      })
    })
  })
})

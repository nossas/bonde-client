import mobilizations from './../../reducers/mobilizations'

import { EDIT_MOBILIZATION } from './../../constants/ActionTypes'

describe('mobilizations', () => {
  describe('EDIT_MOBILIZATION', () => {
    it('should return mobilizations with new data', () => {
      const action = {
        type: EDIT_MOBILIZATION,
        mobilization: {id: 1, google_analytics_code: 'UA-42446026'}
      }

      const newState = mobilizations(
        {data: [{id: 1, google_analytics_code: null}]},
        action
      )

      expect(newState.data).to.deep.include.members([action.mobilization])
    })
  })
})

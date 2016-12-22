import mobilizations from './../../reducers/mobilizations'

import {
  EDIT_MOBILIZATION,
  REQUEST_FETCH_MOBILIZATIONS,
  SUCCESS_FETCH_MOBILIZATIONS,
  FAILURE_FETCH_MOBILIZATIONS
} from './../../constants/ActionTypes'

describe('mobilizations', () => {
  describe('REQUEST_FETCH_MOBILIZATIONS', () => {
    it('should return loaded false', () => {
      const action = { type: REQUEST_FETCH_MOBILIZATIONS }
      const newState = mobilizations(null, action)
      expect(newState.loaded).to.be.false
    })
  })

  describe('SUCCESS_FETCH_MOBILIZATIONS', () => {
    let action
    const result = [{x: '1'}]

    before(() => {
      action = {
        type: SUCCESS_FETCH_MOBILIZATIONS,
        result: result
      }
    })

    it('should return loaded true', () => {
      const newState = mobilizations(null, action)
      expect(newState.loaded).to.be.true
    })

    it('should return data array', () => {
      const newState = mobilizations(null, action)
      expect(newState.data).to.be.eql(result)
    })
  })

  describe('FAILURE_FETCH_MOBILIZATIONS', () => {
    it('should return loaded true', () => {
      const action = { type: FAILURE_FETCH_MOBILIZATIONS }
      const newState = mobilizations(null, action)
      expect(newState.loaded).to.be.true
    })
  })

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

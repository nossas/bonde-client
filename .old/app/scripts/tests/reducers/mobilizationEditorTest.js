import mobilizationEditor from './../../reducers/mobilizationEditor'

import {
  START_EDITING_BLOCK,
  STOP_EDITING_BLOCK
} from './../../reducers/mobilizationEditor'

describe('mobilizationEditor', () => {
  describe('START_EDITING_BLOCK', () => {
    it('should return isEditingBlock true', () => {
      const action = { type: START_EDITING_BLOCK }
      const newState = mobilizationEditor(null, action)
      expect(newState.isEditingBlock).to.be.true
    })
  })

  describe('STOP_EDITING_BLOCK', () => {
    it('should return isEditingBlock false', () => {
      const action = { type: STOP_EDITING_BLOCK }
      const newState = mobilizationEditor(null, action)
      expect(newState.isEditingBlock).to.be.false
    })
  })
})

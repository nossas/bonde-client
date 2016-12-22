import reducer from './../../Widget/reducer'

import { SUCCESS_EDIT_WIDGET } from '../../Widget/actions'

describe('widgets', () => {
  describe('EDIT_WIDGET', () => {
    it('should return the edited widget', () => {
      const newContent = 'My widget content'
      const initialState = {
        data: [
          {
            id: 1,
            block_id: 1,
            size: 12,
            content: 'col-12',
            kind: 'content',
            settings: { content: 'old content' }
          }
        ]
      }
      const action = {
        type: SUCCESS_EDIT_WIDGET,
        widget: {
          id: 1,
          settings: { content: newContent }
        }
      }
      const newState = reducer(initialState, action)
      expect(newState.data[0].settings.content).to.equal(newContent)
    })
  })
})

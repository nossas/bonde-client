import { expect } from 'chai'

import { ADD_MATCH, UPDATE_MATCH, DELETE_MATCH } from './../../constants/ActionTypes'
import { EXPORT_DATACLIP_SUCCESS } from './../../actions/ExportActions'
import reducer from './../reducer'

describe('Widget/reducer', () => {
  context('kind equals match', () => {
    let initialState

    beforeEach(() => {
      // init global state all the tests
      initialState = {
        data: [{
          id: 1,
          kind: 'match',
          match_list: []
        }]
      }
    })

    it('should add match saved in match_list', () => {
      const action = {
        type: ADD_MATCH,
        match: {widget_id: 1}
      }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        data: [{
          id: 1,
          kind: 'match',
          match_list: [{widget_id: 1}]
        }]
      })
    })

    it('should update match saved in match_list', () => {
      initialState.data[0].match_list.push({
        id: 1, goal_image: 'test.png'
      })
      const action = {
        type: UPDATE_MATCH,
        match: {widget_id: 1, id: 1, goal_image: 'changed.png'}
      }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        data: [{
          id: 1,
          kind: 'match',
          match_list: [{widget_id: 1, id: 1, goal_image: 'changed.png'}]
        }]
      })
    })

    it('should remove match when delete choice', () => {
      initialState = {
        data: [{
          id: 1,
          kind: 'match',
          match_list: [
            { id: 1, first_choice: 'framboesa', second_choice: 'lula', goal_image: 'test.png' },
            { id: 2, first_choice: 'framboesa', second_choice: 'tatu', goal_image: 'test.png' },
            { id: 3, first_choice: 'gota', second_choice: 'tatu', goal_image: 'test.png' }
          ]
        }]
      }
      const action = {
        type: DELETE_MATCH,
        widget_id: 1,
        deleted_matches: [2, 3]
      }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        data: [{
          id: 1,
          kind: 'match',
          match_list: [
            {
              id: 1, first_choice: 'framboesa', second_choice: 'lula', goal_image: 'test.png'
            }
          ]
        }]
      })
    })

    it('should update state widget.exported_at when download report', () => {
      initialState = {
        data: [{
          id: 1,
          kind: 'form_entry'
        }]
      }
      const action = { type: EXPORT_DATACLIP_SUCCESS, widget_id: 1 }
      const nextState = reducer(initialState, action)
      expect(nextState).to.have.deep.property('data[0].exported_at')
    })

    it('widget.exported_at state property should be Date type', () => {
      initialState = {
        data: [{
          id: 1,
          kind: 'form_entry'
        }]
      }
      const action = { type: EXPORT_DATACLIP_SUCCESS, widget_id: 1 }
      const nextState = reducer(initialState, action)
      expect(nextState.data[0].exported_at).to.be.Date
    })
  })
})

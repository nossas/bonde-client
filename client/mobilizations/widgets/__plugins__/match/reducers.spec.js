import { expect } from 'chai'

import * as t from './action-types'
import { createAction } from './action-creators/create-action'
import reducers, { initialState } from './reducers'

describe('app/modules/widgets/__plugins__/match/reducers', () => {
  describe('~ Default ~', () => {
    it('should returns the initial state if it not passing any arguments', () => {
      expect(reducers()).to.be.deep.equal(initialState)
    })
    it('should returns the initial state if it passing undefined state', () => {
      expect(reducers(undefined)).to.be.deep.equal(initialState)
    })
    it('should returns the initial state if it passing unknown action type', () => {
      expect(reducers(undefined, 'FOO_BAR')).to.be.deep.equal(initialState)
    })
  })

  describe.skip('FIXME: Pass these tests to each actions', () => {
    describe('~ Create Match ~', () => {
      it('should add match saved in match_list', () => {
        const currentInitialState = {
          data: [{ id: 1, kind: 'match', match_list: [] }]
        }
        const action = createAction(t.WIDGET_MATCH_CREATE_SUCCESS, { widget_id: 1 })
        const nextState = reducers(currentInitialState, action)
        expect(nextState).to.deep.equal({
          data: [{ id: 1, kind: 'match', match_list: [{ widget_id: 1 }] }]
        })
      })
    })

    describe('~ Update Match ~', () => {
      it('should update match saved in match_list', () => {
        const currentInitialState = {
          data: [{ id: 1, kind: 'match', match_list: [] }]
        }
        currentInitialState.data[0].match_list.push(
          { id: 1, goal_image: 'test.png' }
        )
        const action = createAction(
          t.WIDGET_MATCH_UPDATE_SUCCESS,
          { widget_id: 1, id: 1, goal_image: 'changed.png' }
        )
        const nextState = reducers(currentInitialState, action)
        expect(nextState).to.deep.equal({
          data: [{
            id: 1,
            kind: 'match',
            match_list: [
              { widget_id: 1, id: 1, goal_image: 'changed.png' }
            ]
          }]
        })
      })
    })

    describe('~ Destroy Match ~', () => {
      it('should remove match when delete choice', () => {
        const currentInitialState = {
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
        const action = createAction(
          t.WIDGET_MATCH_DESTROY_SUCCESS,
          { widget_id: 1, deleted_matches: [2, 3] }
        )
        const nextState = reducers(currentInitialState, action)
        expect(nextState).to.deep.equal({
          data: [{
            id: 1,
            kind: 'match',
            match_list: [
              { id: 1, first_choice: 'framboesa', second_choice: 'lula', goal_image: 'test.png' }
            ]
          }]
        })
      })
    })
  })
})

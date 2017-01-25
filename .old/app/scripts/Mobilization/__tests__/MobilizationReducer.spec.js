import { expect } from 'chai'

import {
  EDIT_MOBILIZATION,

  PROGRESS_UPLOAD_FACEBOOK_IMAGE,
  FINISH_UPLOAD_FACEBOOK_IMAGE
} from '../MobilizationActions'

import * as t from '../actionTypes'

import reducer, { initialState } from '../MobilizationReducer'

describe('MobilizationReducer', () => {
  describe('#list', () => {
    it('should load mobilizations in data', () => {
      const action = {
        type: t.FETCH_SUCCESS,
        result: [
          { id: 1 }
        ]
      }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({
        loading: false,
        loaded: true,
        data: [
          { id: 1 }
        ]
      })
    })
  })

  describe('#editMobilization', () => {
    it('should edit mobilization ind data', () => {
      const previousState = {
        loading: false,
        loaded: true,
        data: [ { id: 1 } ]
      }
      const action = {
        type: EDIT_MOBILIZATION,
        mobilization: { id: 1, name: 'Lorem' }
      }
      const nextState = reducer(previousState, action)
      expect(nextState).to.deep.equal({
        loading: false,
        loaded: true,
        data: [ { id: 1, name: 'Lorem' } ]
      })
    })
  })

  describe('#sharing', () => {
    describe('PROGRESS_UPLOAD_FACEBOOK_IMAGE', () => {
      it('should change state and set isFacebookShareImageUploading to true with initial state',
        () => {
          const action = { type: PROGRESS_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(undefined, action)
          const expectedState = { ...initialState, isFacebookShareImageUploading: true }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
      it('should change state and set isFacebookShareImageUploading to true with previous state',
        () => {
          const previousState = {
            loading: false,
            loaded: true,
            data: [ { id: 1 } ]
          }
          const action = { type: PROGRESS_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(previousState, action)
          const expectedState = { ...previousState, isFacebookShareImageUploading: true }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
    })
    describe('FINISH_UPLOAD_FACEBOOK_IMAGE', () => {
      it('should change state and set isFacebookShareImageUploading to false with initial state',
        () => {
          const action = { type: FINISH_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(undefined, action)
          const expectedState = { ...initialState, isFacebookShareImageUploading: false }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
      it('should change state and set isFacebookShareImageUploading to false with previous state',
        () => {
          const previousState = {
            loading: false,
            loaded: true,
            data: [ { id: 1 } ]
          }
          const action = { type: FINISH_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(previousState, action)
          const expectedState = { ...previousState, isFacebookShareImageUploading: false }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
    })
  })
})

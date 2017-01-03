import React from 'react'
import { expect } from 'chai'

import {
  ADD_MOBILIZATION,
  EDIT_MOBILIZATION
} from '../MobilizationActions'

import * as MobilizationActions from '../MobilizationActions'

describe('MobilizationActions', () => {
  describe('#progressUploadFacebookImage', () => {
    const result = MobilizationActions.progressUploadFacebookImage()

    it('should return an object', () => {
      expect(result).to.be.an.object
    })
    it('should have `type` key', () => {
      expect(result).to.have.keys('type')
    })
    it('`type` key should be PROGRESS_UPLOAD_FACEBOOK_IMAGE', () => {
      expect(result).to.have.property('type', 'PROGRESS_UPLOAD_FACEBOOK_IMAGE')
    })
  })

  describe('#finishUploadFacebookImage', () => {
    const result = MobilizationActions.finishUploadFacebookImage()

    it('should return an object', () => {
      expect(result).to.be.an.object
    })
    it('should have `type` key', () => {
      expect(result).to.have.keys('type')
    })
    it('`type` key should be FINISH_UPLOAD_FACEBOOK_IMAGE', () => {
      expect(result).to.have.property('type', 'FINISH_UPLOAD_FACEBOOK_IMAGE')
    })
  })

  describe('#addMobilization', () => {
    it('should return action to add', () => {
      const mobilization = { id: 1, name: 'Lorem', 'goal': 'Savings' }
      expect(MobilizationActions.addMobilization(mobilization)).to.deep.equal({
        type: ADD_MOBILIZATION,
        mobilization
      })
    })
  })

  describe('#editMobilization', () => {
    it('should return action to edit', () => {
      const mobilization = { id: 1, name: 'Lorem', 'goal': 'Savings' }
      expect(MobilizationActions.editMobilization(mobilization)).to.deep.equal({
        type: EDIT_MOBILIZATION,
        mobilization
      })
    })
  })
})

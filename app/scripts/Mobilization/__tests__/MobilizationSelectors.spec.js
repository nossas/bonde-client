import { expect } from 'chai'

import { getMobilization } from '../MobilizationSelectors'

describe('MobilizationSelectors', () => {
  const state = {
    mobilization: {
      data: [
        { id: 1, name: 'Lorem', goal: 'Lorem ipsum' },
        { id: 2, name: 'Ipsum', goal: 'Ipsum dolor' },
        { id: 3, name: 'Dolor', goal: 'Dolor lorem' }
      ]
    }
  }

  it('should get mobilization by mobilization_id', () => {
    const ownProps = {
      params: {
        mobilization_id: 2
      }
    }
    const mobilization = getMobilization(state, ownProps)
    expect(mobilization).to.deep.equal({
      id: 2, name: 'Ipsum', goal: 'Ipsum dolor'
    })
  })

  it('should get mobilization by mobilization_id typeof string', () => {
    const ownProps = {
      params: {
        mobilization_id: '2'
      }
    }
    const mobilization = getMobilization(state, ownProps)
    expect(mobilization).to.deep.equal({
      id: 2, name: 'Ipsum', goal: 'Ipsum dolor'
    })
  })
})

import { expect } from 'chai'

import { getBlocks } from '../BlockSelectors'

describe('BlockSelectors', () => {
  const globalState = {
    blocks: {
      loading: false,
      loaded: true,
      data: [
        {
          id: 1,
          mobilization_id: 1
        },
        {
          id: 2,
          mobilization_id: 1
        },
        {
          id: 3,
          mobilization_id: 2
        }
      ]
    }
  }

  it('#getBlocks should filter blocks by mobilizationId', () => {
    const blocks = getBlocks(globalState, 2)
    expect(blocks.length).to.equal(1)
  })
})

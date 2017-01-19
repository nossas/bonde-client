import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import ChoiceCombined from './choice-combined'

describe.skip('app/modules/widgets/__plugins__/match/components/choice-combined', () => {
  let wrapper
  let props = {
    first_choice: 'ChoiceA',
    second_choice: 'ChoiceB',
    match: {},
    handleUploadFinish: () => {}
  }

  beforeEach(() => {
    wrapper = shallow(<ChoiceCombined {...props} />)
  })

  it('should receive Goal object when upload finish', () => {
    let expectedGoal
    wrapper.setProps({
      handleUploadFinish: (goal) => {
        expectedGoal = goal
      }
    })
    expect(expectedGoal).to.equal({
      a: 'ChoiceA',
      b: 'ChoiceB',
      imageUrl: ''
    })
  })
})

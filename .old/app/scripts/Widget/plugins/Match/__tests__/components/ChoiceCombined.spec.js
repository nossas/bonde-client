import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { ChoiceCombined } from '../../components'

describe('Match/components/ChoiceCombined', () => {
  let wrapper
  let props = {
    first_choice: 'ChoiceA', second_choice: 'ChoiceB',
    handleFinishUpload: () => {}
  }

  before(() => {
    wrapper = mount(<ChoiceCombined {...props} />)
  })

  /*it('should receive Goal object when upload finish', () => {
    let expectedGoal
    wrapper.setProps({
      handleFinishUpload: (goal) => {
        expectedGoal = goal
      }
    })
    expect(expectedGoal).to.equal({
      a: 'ChoiceA',
      b: 'ChoiceB',
      imageUrl: ''
    })
  })*/
})

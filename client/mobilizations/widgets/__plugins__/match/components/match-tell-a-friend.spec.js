import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import MatchTellAFriend from './match-tell-a-friend'

describe('app/modules/widgets/__plugins__/match/components/match-tell-a-friend', () => {
  let wrapper
  const props = {
    mobilization: {},
    matchItem: {
      id: 1,
      widget_id: 1,
      goal_image: 'goal-image.png'
    }
  }

  before(() => {
    wrapper = shallow(<MatchTellAFriend {...props} />)
  })

  describe('when it have match item', () => {
    it('should pass goal image as a prop to <TellAFriend /> component', () => {
      expect(wrapper.find('TellAFriend').props())
        .to.have.property('imageUrl', props.matchItem.goal_image)
    })
  })

  describe('when it does not have match item', () => {
    it('should pass placeholdit image url as a prop to <TellAFriend /> component', () => {
      wrapper.setProps({ ...props, matchItem: undefined })
      expect(wrapper.find('TellAFriend').props())
        .to.have.property('imageUrl')
        .that.have.string('placeholdit')
    })
  })
})

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

// Current module dependencies
import { MatchTellAFriend } from '~widget-plugins/match/components'

describe('client/mobilizations/widgets/__plugins__/match/components/match-tell-a-friend', () => {
  let wrapper
  const props = {
    mobilization: {},
    matchItem: {
      id: 1,
      widget_id: 1,
      goal_image: 'goal-image.png'
    }
  }

  beforeAll(() => {
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

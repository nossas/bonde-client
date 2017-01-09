import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { GoalsPage } from '../../pages'

describe('Match/pages/GoalsPage', () => {
  let wrapper
  let match_list = [
    {
      id: 43,
      widget_id: 93,
      first_choice: 'Framboesa',
      second_choice: 'Auxílio gravata',
      goal_image: 'https://s3.amazonaws.com/hub-central-dev/uploads/1467915408_Untitled-1.jpg',
      created_at: '2016-07-07T15:16:50.126-03:00',
      updated_at: '2016-07-07T15:16:50.126-03:00'
    },
    {
      id: 44,
      widget_id: 93,
      first_choice: 'Framboesa',
      second_choice: 'Auxílio terno',
      goal_image: 'https://s3.amazonaws.com/hub-central-dev/uploads/1467915698_nossascidades.jpg',
      created_at: '2016-07-07T15:21:43.153-03:00',
      updated_at: '2016-07-07T15:21:43.153-03:00'
    }
  ]

  let props = {
    params: { widget_id: '1' },
    mobilization: { id: 1 },
    widgets: { data: [{ id: 1, settings: {}, match_list }] },
    location: { pathname: '' },
    auth: { credentials: {} },
    dispatch: sinon.spy()
  }

  const mockContext = {
    router: {
      makeHref: sinon.stub(),
      isActive: sinon.stub()
    }
  }

  before(() => {
    wrapper = mount(<GoalsPage {...props} />, { context: mockContext })
  })

  it('should render ChoiceCombined itens equals possible match', () => {
    wrapper.setProps({
      widgets: { data: [{ id: 1, match_list, settings: {
        choices1: '1,2,3',
        choicesA: '4,5'
      } }]}
    })
    expect(wrapper.find('ChoiceCombined').length).to.equal(3 * 2)
  })
})

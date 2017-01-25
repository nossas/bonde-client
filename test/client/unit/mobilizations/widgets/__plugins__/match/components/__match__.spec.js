import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as paths from '~client/paths'

// Current module dependencies
import Match from '~widget-plugins/match/components'

describe('client/mobilizations/widgets/__plugins__/match/components/__match__', () => {
  let wrapper
  let sandbox
  let spy = {}

  let context = {
    router: { transitionTo: sinon.spy() }
  }

  let props = {
    editable: true,
    mobilization: { id: 1 },
    widget: {
      widget: 1,
      settings: {
        choices1: 'Framboesa,Auxílio Terno',
        choicesA: 'Hospital,Escola',
        title_text: 'Foo Bar Widget Title!',
        labelChoices1: 'Foo Bar Choice1 Label!',
        labelChoicesA: 'Foo Bar ChoiceA Label!'
      },
      match_list: [{
        id: 1,
        widget_id: 1,
        first_choice: 'Framboesa',
        second_choice: 'Hospital',
        goal_image: 'test.img'
      }]
    },
    dispatch: sinon.spy()
  }

  beforeAll(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    wrapper = shallow(<Match {...props} />, { context })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    it(`should call renderChoices method when it isn't combined`, () => {
      spy.renderChoices = sandbox.spy(Match.prototype, 'renderChoices')
      expect(spy.renderChoices).to.have.been.called
    })

    it(`should call renderShareButtons method when it is combined`, () => {
      wrapper.setState({
        combined: true,
        selectedChoice1: props.widget.settings.choices1.split(',')[0],
        selectedChoiceA: props.widget.settings.choicesA.split(',')[0]
      })
      spy.renderShareButtons = sandbox.spy(Match.prototype, 'renderShareButtons')
      expect(spy.renderShareButtons).to.have.been.called
    })
  })

  describe('#renderChoices', () => {
    describe('when passing props', () => {
      it('should render two <Choices> component', () => {
        expect(wrapper.find('Choices').length).to.equal(2)
      })

      it('second choices should be disabled', () => {
        expect(wrapper.find('Choices').at(1).props().disabled).to.equal(true)
      })

      it('match button should be disabled', () => {
        expect(wrapper.find('button.match').props().disabled).to.equal(true)
      })

      it('should enable second choices after selects first choice', () => {
        const target = { value: props.widget.settings.choices1.split(',')[1] }
        wrapper.find('Choices').at(0).simulate('change', { target })
        expect(wrapper.find('Choices').at(1).props().disabled).to.equal(false)
      })

      it('should show user capture data form after selects first and second choices', () => {
        const { widget: { settings: { choices1, choicesA } } } = props

        let target
        target = { value: choices1.split(',')[1] }
        wrapper.find('Choices').at(0).simulate('change', { target })

        target = { value: choicesA.split(',')[0] }
        wrapper.find('Choices').at(1).simulate('change', { target })

        expect(wrapper.find('Input')).to.length(3)
      })

      it('should enable match button after selects first and second choices', () => {
        const { widget: { settings: { choices1, choicesA } } } = props

        let target
        target = { value: choices1.split(',')[1] }
        wrapper.find('Choices').at(0).simulate('change', { target })

        target = { value: choicesA.split(',')[0] }
        wrapper.find('Choices').at(1).simulate('change', { target })

        expect(wrapper.find('button.match').props().disabled).to.equal(false)
      })

      it('should change combined state to true if dont have errors after match button is clicked', () => {
        const { widget: { settings: { choices1, choicesA } } } = props
        wrapper.setState({
          selectedChoice1: choices1.split(',')[0],
          selectedChoiceA: choicesA.split(',')[0],
          firstname: 'Foo Firstname',
          lastname: 'Foo Lastname',
          email: 'bar@email.com'
        })
        spy.setState = sandbox.spy(Match.prototype, 'setState')
        wrapper.find('button.match').simulate('click')
        expect(spy.setState.called).to.be.true
        expect(spy.setState.calledWith({ combined: true })).to.be.true
      })

      it('should enable edit overlay block when mouseEnter', () => {
        wrapper.simulate('mouseEnter')
        expect(wrapper.find(''))
      })

      it('should render default list when settings choices1 or choicesA undefined', () => {
        wrapper.setProps({ widget: { settings: {
          labelChoices1: 'Foo Bar Choice1 Label!',
          labelChoicesA: 'Foo Bar ChoiceA Label!'}
        } })
        expect(wrapper).to.be.ok
      })
    })
  })

  describe('#redirectTo', () => {
    describe('when overlay widget was clicked and it is editable', () => {
      beforeAll(() => {
        wrapper.find('WidgetOverlay').simulate('click')
      })

      it('should call transitionTo', () => {
        expect(context.router.transitionTo.calledOnce).to.equal(true)
      })

      it('should transitionTo called with correct params', () => {
        const { mobilization, widget } = props
        const path = paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
        expect(context.router.transitionTo.calledWith(path)).to.equal(true)
      })
    })
  })

  describe('#renderShareButtons', () => {
    it('should render one <MatchTellAFriend> component if choices it is combined', () => {
      const { widget: { settings: { choices1, choicesA } } } = props
      wrapper.setState({
        combined: true,
        selectedChoice1: choices1.split(',')[0],
        selectedChoiceA: choicesA.split(',')[0]
      })
      expect(wrapper.find('MatchTellAFriend')).to.have.length(1)
    })
  })
})

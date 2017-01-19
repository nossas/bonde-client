import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as Paths from '../../../../../scripts/Paths'
import SettingsMenu from './settings-menu'

describe('app/modules/widgets/__plugins__/match/components/settings-menu', () => {
  let wrapper

  const props = {
    mobilization: { id: 1 },
    widget: { id: 1 },
    location: { pathname: Paths.matchChoicesMobilizationWidget(1, 1) }
  }

  const CHOICES_TAB = 0
  const GOALS_TAB = 1

  beforeEach(() => {
    wrapper = shallow(<SettingsMenu {...props} />)
  })

  describe('#render', () => {
    context('Tabs', () => {
      it('should render one <Tabs /> component', () => {
        expect(wrapper.find('Tabs')).to.have.length(1)
      })
      it('should render 3 <Tab /> components', () => {
        expect(wrapper.find('Tab').length).to.equal(3)
      })

      context('Choices Tab', () => {
        it('should render with choices path as path prop', () => {
          const expectedPath = Paths.matchChoicesMobilizationWidget(1, 1)
          expect(wrapper.find('Tab').at(CHOICES_TAB).props().path).to.equal(expectedPath)
        })
        it('should render with expected text prop', () => {
          const expectedText = 'Opções de combinação'
          expect(wrapper.find('Tab').at(CHOICES_TAB).props().text).to.equal(expectedText)
        })
        it('should render isActive prop as true if current location is equal to choices tab path', () => {
          wrapper.setProps({
            location: { pathname: Paths.matchChoicesMobilizationWidget(1, 1) }
          })
          expect(wrapper.find('Tab').at(CHOICES_TAB).props().isActive).to.be.true
        })
        it('should render isActive prop as false if current location is different to choices tab path', () => {
          wrapper.setProps({
            ...props,
            location: { pathname: Paths.matchGoalsMobilizationWidget(1, 1) }
          })
          expect(wrapper.find('Tab').at(CHOICES_TAB).props().isActive).to.be.false
        })
      })

      context('Goals Tab', () => {
        it('should render with goals path as path prop', () => {
          const expectedPath = Paths.matchGoalsMobilizationWidget(1, 1)
          expect(wrapper.find('Tab').at(GOALS_TAB).props().path).to.equal(expectedPath)
        })
        it('should render with expected text prop', () => {
          const expectedText = 'Resultados das combinações'
          expect(wrapper.find('Tab').at(GOALS_TAB).props().text).to.equal(expectedText)
        })
        it('should render isActive prop as true if current location is equal to choices tab path', () => {
          wrapper.setProps({
            location: { pathname: Paths.matchGoalsMobilizationWidget(1, 1) }
          })
          expect(wrapper.find('Tab').at(GOALS_TAB).props().isActive).to.be.true
        })
        it('should render isActive prop as false if current location is different to choices tab path', () => {
          wrapper.setProps({
            location: { pathname: Paths.matchChoicesMobilizationWidget(1, 1) }
          })
          expect(wrapper.find('Tab').at(GOALS_TAB).props().isActive).to.be.false
        })
      })
    })
  })
})

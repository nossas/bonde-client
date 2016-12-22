import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import * as Paths from '../../../../Paths'
import { NewMobilizationHeaderSteps } from '../../../components'

describe('app/scripts/Mobilization/components/NewMobilizationHeader/NewMobilizationHeaderSteps',
  () => {
    let wrapper
    const props = {
      steps: [
        { name: 'Foo', active: true },
        { name: 'Bar', active: false }
      ]
    }

    beforeEach(() => {
      wrapper = shallow(<NewMobilizationHeaderSteps {...props} />)
    })

    describe('#render', () => {
      it('should render one <ul>.list-reset element', () => {
        expect(wrapper.find('ul.list-reset')).to.have.length(1)
      })
      it('should render two <li> element', () => {
        expect(wrapper.find('li')).to.have.length(2)
      })

      describe('when first step is active', () => {
        describe('first <li> element', () => {
          let firstStep
          before(() => {
            firstStep = wrapper.find('li').at(0)
          })

          it('should render element that contains "Foo" text', () => {
            expect(firstStep.text()).to.have.string('Foo')
          })
          it('should render with className that contains "bold black" classes', () => {
            expect(firstStep.props().className).to.have.string('bold black')
          })
          it('should render <i> element that contains "1"', () => {
            expect(firstStep.find('i').text()).to.be.equal('1')
          })
          it('should render <i> element with className that contains "bg-pagenta"', () => {
            expect(firstStep.find('i').props().className).to.have.string('bg-pagenta')
          })
          it('should render <i> element with className that not contains "bg-gray94"', () => {
            expect(firstStep.find('i').props().className).to.have.not.string('bg-gray94')
          })
        })

        describe('second <li> element', () => {
          let secondStep
          before(() => {
            secondStep = wrapper.find('li').at(1)
          })

          it('should render element that contains "Bar" text', () => {
            expect(secondStep.text()).to.have.string('Bar')
          })
          it('should render with className that not contains "bold black" classes', () => {
            expect(secondStep.props().className).to.not.have.string('bold black')
          })
          it('should render first <i> element inside <li> contains "1"', () => {
            expect(secondStep.find('i').text()).to.be.equal('2')
          })
          it('should render <i> element with className that contains "bg-gray94"', () => {
            expect(secondStep.find('i').props().className).to.have.string('bg-gray94')
          })
          it('should render <i> element with className that not contains "bg-pagenta"', () => {
            expect(secondStep.find('i').props().className).to.not.have.string('bg-pagenta')
          })
        })
      })

      describe('when second step is active', () => {
        beforeEach(() => {
          const steps = [
            { name: 'Foo', active: false },
            { name: 'Bar', active: true }
          ]
          wrapper = shallow(<NewMobilizationHeaderSteps steps={steps} />)
        })

        describe('first <li> element', () => {
          let firstStep
          beforeEach(() => {
            firstStep = wrapper.find('li').at(0)
          })

          it('should render with className that not contains "bold black" classes', () => {
            expect(firstStep.props().className).to.have.not.string('bold black')
          })
          it('should render <i> element with className that contains "bg-gray94"', () => {
            expect(firstStep.find('i').props().className).to.have.string('bg-gray94')
          })
          it('should render <i> element with className that not contains "bg-pagenta"', () => {
            expect(firstStep.find('i').props().className).to.have.not.string('bg-pagenta')
          })
        })

        describe('second <li> element', () => {
          let secondStep
          beforeEach(() => {
            secondStep = wrapper.find('li').at(1)
          })

          it('should render with className that contains "bold black" classes', () => {
            expect(secondStep.props().className).to.have.string('bold black')
          })
          it('should render <i> element with className that contains "bg-pagenta"', () => {
            expect(secondStep.find('i').props().className).to.have.string('bg-pagenta')
          })
          it('should render <i> element with className that not contains "bg-gray94"', () => {
            expect(secondStep.find('i').props().className).to.have.not.string('bg-gray94')
          })
        })
      })
    })
  }
)

import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'

// Current module dependencies
import Draft from '~widget-plugins/draft/components'

describe('client/mobilizations/widgets/__plugins__/draft/components/__draft__', () => {
  let wrapper
  let props = {
    dispatch: () => {},
    auth: {},
    mobilization: {},
    widget: {},
    editable: true,
    loading: false
  }

  describe('when it is editable', () => {
    beforeAll(() => {
      sinon.spy(Draft.prototype, 'updateKind')
    })

    beforeEach(() => {
      wrapper = shallow(<Draft {...props} />)
    })

    afterAll(() => {
      Draft.prototype.updateKind.restore()
    })

    describe('#render', () => {
      it('should render a .draft-widget <div> when it is editable', () => {
        expect(wrapper.find('div.draft-widget')).to.have.length(1)
      })

      describe('draft widget button', () => {
        it('should render five <DraftWidgetButton> components', () => {
          expect(wrapper.find('DraftWidgetButton')).to.have.length(5)
        })

        describe('Content widget button', () => {
          let button
          beforeAll(() => {
            button = wrapper.find('DraftWidgetButton').at(0)
          })

          it('should render first <DraftWidgetButton> with label prop as "Texto"', () => {
            expect(button.props().label).to.be.equal('Texto')
          })
          it('should render first <DraftWidgetButton> with icon prop as "font"', () => {
            expect(button.props().icon).to.be.equal('font')
          })
          it('should render first <DraftWidgetButton> with onClick prop as a function', () => {
            expect(button.props().onClick).to.be.a.function
          })
        })

        describe('Form widget button', () => {
          let button
          beforeAll(() => {
            button = wrapper.find('DraftWidgetButton').at(1)
          })

          it('should render second <DraftWidgetButton> with label prop as "Formulário"', () => {
            expect(button.props().label).to.be.equal('Formulário')
          })
          it('should render second <DraftWidgetButton> with icon prop as "list"', () => {
            expect(button.props().icon).to.be.equal('list')
          })
          it('should render second <DraftWidgetButton> with onClick prop as a function', () => {
            expect(button.props().onClick).to.be.a.function
          })
        })

        describe('Donation widget button', () => {
          let button
          beforeAll(() => {
            button = wrapper.find('DraftWidgetButton').at(2)
          })

          it('should render third <DraftWidgetButton> with label prop as "Doação"', () => {
            expect(button.props().label).to.be.equal('Doação')
          })
          it('should render third <DraftWidgetButton> with icon prop as "money"', () => {
            expect(button.props().icon).to.be.equal('money')
          })
          it('should render third <DraftWidgetButton> with onClick prop as a function', () => {
            expect(button.props().onClick).to.be.a.function
          })
        })

        describe('Match widget button', () => {
          let button
          beforeAll(() => {
            button = wrapper.find('DraftWidgetButton').at(3)
          })

          it('should render fourth <DraftWidgetButton> with label prop as "Match"', () => {
            expect(button.props().label).to.be.equal('Match')
          })
          it('should render fourth <DraftWidgetButton> with icon prop as "compress"', () => {
            expect(button.props().icon).to.be.equal('compress')
          })
          it('should render fourth <DraftWidgetButton> with onClick prop as a function', () => {
            expect(button.props().onClick).to.be.a.function
          })
        })

        describe('Pressure widget button', () => {
          let button
          beforeAll(() => {
            button = wrapper.find('DraftWidgetButton').at(4)
          })

          it('should render fifth <DraftWidgetButton> with label prop as "Pressão"', () => {
            expect(button.props().label).to.be.equal('Pressão')
          })
          it('should render fifth <DraftWidgetButton> with icon prop as "bullseye"', () => {
            expect(button.props().icon).to.be.equal('bullseye')
          })
          it('should render fifth <DraftWidgetButton> with onClick prop as a function', () => {
            expect(button.props().onClick).to.be.a.function
          })
        })
      })
    })
  })
})

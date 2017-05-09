import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as paths from '~client/paths'
import Sidebar from '~client/components/navigation/sidebar/sidebar'

describe('client/components/navigation/sidebar/sidebar', () => {
  let wrapper
  const props = {
    loading: false,
    mobilization: { id: 1, slug: 'foobar' },
    user: { email: 'foo@bar.com' },
    community: {}
  }

  beforeAll(() => {
    wrapper = shallow(
      <Sidebar {...props}>
        <h1>Foo bar</h1>
      </Sidebar>
    )
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })

    describe('when editing a mobilization', () => {
      describe('launch navbar item', () => {
        it('should render an item with "PUBLICAR BONDE" text by default', () => {
          expect(wrapper.find('SidenavListItem').at(0).props().text).to.be.equal('PUBLICAR BONDE')
        })
        it('should render an item with "BONDE público" text if it already have a custom domain', () => {
          const mobilization = {
            ...props.mobilization,
            custom_domain: 'foo.bar',
            facebook_share_image: 'http://foobar.png',
            facebook_share_title: 'Facebook Title',
            facebook_share_description: 'Facebook Description',
            twitter_share_text: 'Twitter Title'
          }
          wrapper.setProps({ ...props, mobilization })
          expect(wrapper.find('SidenavListItem').at(0).props().text).to.be.equal('BONDE público')
          wrapper.setProps(props)
        })
      })

      describe('default navbar items', () => {
        describe('- editar mobilização', () => {
          it('should render with its text properly', () => {
            const text = 'Editar mobilização'
            expect(wrapper.find('SidenavListItem').at(1).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'pencil'
            expect(wrapper.find('SidenavListItem').at(1).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.editMobilization(props.mobilization.id)
            expect(wrapper.find('SidenavListItem').at(1).props().href).to.be.equal(href)
          })
        })

        describe('- adicionar conteúdo', () => {
          it('should render with its text properly', () => {
            const text = 'Adicionar conteúdo'
            expect(wrapper.find('SidenavListItem').at(2).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'plus'
            expect(wrapper.find('SidenavListItem').at(2).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.createBlock({ id: props.mobilization.id })
            expect(wrapper.find('SidenavListItem').at(2).props().href).to.be.equal(href)
          })
        })

        describe('- ver em uma nova aba', () => {
          it('should render with its text properly', () => {
            const text = 'Ver em uma nova aba'
            expect(wrapper.find('SidenavListItem').at(3).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'external-link'
            expect(wrapper.find('SidenavListItem').at(3).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.mobilization(props.mobilization)
            expect(wrapper.find('SidenavListItem').at(3).props().href).to.be.equal(href)
          })
          it('should render with linkType prop as "anchor"', () => {
            expect(wrapper.find('SidenavListItem').at(3).props().linkType).to.be.equal('anchor')
          })
          it('should render with target prop as "_blank"', () => {
            expect(wrapper.find('SidenavListItem').at(3).props().target).to.be.equal('_blank')
          })
        })

        describe('- configurações', () => {
          it('should render with its text properly', () => {
            const text = 'Configurações'
            expect(wrapper.find('SidenavListItem').at(4).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'cog'
            expect(wrapper.find('SidenavListItem').at(4).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.basicsMobilization(props.mobilization.id)
            expect(wrapper.find('SidenavListItem').at(4).props().href).to.be.equal(href)
          })
        })
      })
    })

    describe('when is not editing a mobilization', () => {
      let itemIndex = -1
      const incrementIndex = () => { itemIndex++ }
      beforeAll(() => {
        wrapper.setProps({ ...props, mobilization: undefined })
      })
      afterAll(() => {
        wrapper.setProps(props)
      })

      describe('community settings navbar items', () => {
        describe('- minhas mobilizações', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            const text = 'Minhas Mobilizações'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'list'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.mobilizations()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })

        describe('- informações', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            const text = 'Informações'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'info-circle'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.communityInfo()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })

        describe('- mailchimp', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            const text = 'Mailchimp'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'envelope-o'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.communityMailchimp()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })

        describe('- recebedor', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            const text = 'Recebedor'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'money'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.communityRecipient()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })

        describe('- relatório', () => {
          beforeAll(incrementIndex)

          it('should render with its text properly', () => {
            const text = 'Relatório'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().text).to.be.equal(text)
          })
          it('should render with its icon properly', () => {
            const icon = 'file-excel-o'
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().icon).to.be.equal(icon)
          })
          it('should render with its href properly', () => {
            const href = paths.communityReport()
            expect(wrapper.find('SidenavListItem').at(itemIndex).props().href).to.be.equal(href)
          })
        })
      })
    })
  })
})

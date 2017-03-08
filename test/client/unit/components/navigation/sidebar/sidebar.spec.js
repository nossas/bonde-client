import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Sidebar from '~components/navigation/sidebar/sidebar'

describe('client/components/navigation/sidebar/sidebar', () => {
  let wrapper
  const props = {
    loading: false,
    mobilization: { id: 1 },
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

    describe('lanch', () => {
      it('should render an item with "PUBLICAR BONDE" text by default', () => {
        expect(wrapper.find('SidenavListItem').at(0).props().text).to.be.equal('PUBLICAR BONDE')
      })
      it('should render an item with "BONDE público" text if it already have a custom domain', () => {
        const mobilization = { ...props.mobilization, custom_domain: 'foo.bar' }
        wrapper.setProps({ ...props, mobilization })
        expect(wrapper.find('SidenavListItem').at(0).props().text).to.be.equal('BONDE público')
      })
    })
  })
})

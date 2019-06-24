import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown, DropdownHeader, DropdownItem, Icon } from 'bonde-styleguide'
import UserDropdown from './UserDropdown'
import { expect } from 'chai'

describe('components > PageLogged > Header > UserDropdown > UserDropdown', () => {
  const user = { firstName: 'Test', lastName: 'Dummy' }
  const name = `${user.firstName} ${user.lastName}`
  let node
  
  beforeEach(() => {
    const props = { user, t: () => {} }
    node = shallow(<UserDropdown {...props} />)
  })

  it('render a Dropdown component', () => {
    expect(node.find(Dropdown)).to.be.lengthOf(1)
  })

  it('pass user name like label dropdown', () => {
    expect(node.find(Dropdown).props().label).to.be.equal(name)
  })

  it('render avatar in dropdown header', () => {
    const avatar = 'http://avatar.png'
    node.setProps({ user: { ...user, avatar } })

    expect(node.find(DropdownHeader).find('img').props().src).to.be.equal(avatar)
    expect(node.find(DropdownHeader).find('span').text()).to.be.equal(name)
  })

  it('render a profile menu', () => {
    const i18nKey = 'dropdown.items.profile'
    const i18n = () => i18nKey
    node.setProps({ t: i18n })
  
    const item = node.find(DropdownItem).at(0)
    expect(item.find(Icon).props().name).to.be.equal('times')
    expect(item.props().children[1]).to.be.equal(i18nKey)
  })

  it('render a logout menu', () => {
    const i18nKey = 'dropdown.items.logout'
    const i18n = () => i18nKey
    const logout = () => 'logout'
    node.setProps({ t: i18n, logout })

    const item = node.find(DropdownItem).at(0)
    expect(item.find(Icon).props().name).to.be.equal('times')
    expect(item.props().children[1]).to.be.equal(i18nKey)
    expect(item.props().onClick()).to.be.equal('logout')
  })
})

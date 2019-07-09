import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import urljoin from 'url-join'
import CommunitiesDropdown from './CommunitiesDropdown'
import { expect } from 'chai'

<<<<<<< HEAD
<<<<<<< HEAD
describe('components > PageLogged > Header > CommunitiesDropdown > CommunitiesDropdown', () => {
  let node
  let communities

  beforeEach(() => {
    const props = {
      t: (key) => key,
      loading: 'false',
      communities: [
        { id: 1, name: 'C1' },
        { id: 2, name: 'C2' }
      ],
    }
    node = shallow(
      <CommunitiesDropdown
        {...props}
      />
    )
  })

  console.log(node)

  it('render a Dropdown component', () => {
<<<<<<< HEAD
    expect(node.find(Dropdown).length).to.be.equal(1)
  })

  it('translate label for communities', () => {
    const i18nKey = 'dropdown.label.communities'
    const i18n = () => i18nKey
    node.setProps({ t: i18n })

    expect(node.find(Dropdown).props().label).to.be.equal(i18nKey)
  })

  it('when data is empty render disabled', () => {
    expect(node.find(Dropdown).props().disabled).to.be.true
  })

  it('render DropdownItem when data is passed', () => {
    const communities = [
      { id: 1, name: 'C1' },
      { id: 2, name: 'C2' }
    ]
    node.setProps({ communities })

    expect(node.find(DropdownItem).length).to.be.equal(communities.length)
    expect(node.find(DropdownItem).at(0).props().children).to.be.equal('C1')
    expect(node.find(DropdownItem).at(1).props().children).to.be.equal('C2')
  })

  it('render DropdownItem with Link router', () => {
    const communities = [{ id: 1, name: 'C1' }]
    node.setProps({ communities })
    expect(node.find(DropdownItem).props().component).to.be.equal(Link)
  })

  it('mount path to redirect with id when pass path', () => {
    const communities = [{ id: 1, name: 'C1' }]
    const path = '/admin/communities/'
    node.setProps({ communities, path })
    expect(node.find(DropdownItem).props().to).to.be.equal(urljoin(path, communities[0].id.toString()))
  })
})
=======
// describe('components > PageLogged > Header > CommunitiesDropdown > CommunitiesDropdown', () => {
  // let node

  // beforeEach(() => {
  //   const props = {
  //     t: (key) => key,
  //     path: '/communities'
  //   }
  //   node = shallow(<CommunitiesDropdown {...props} />)
  // })
=======
describe('components > PageLogged > Header > CommunitiesDropdown > CommunitiesDropdown', () => {
  let node
>>>>>>> 4ecc3ef8... feat(admin-canary): refactor icons UserCommunities

  beforeEach(() => {
    const props = {
      t: (key) => key,
      path: '/communities'
    }
    node = shallow(<CommunitiesDropdown {...props} />)
  })

  it('render a Dropdown component', () => {
    // expect(node.find(Dropdown).length).to.be.equal(1)
=======
    console.log(node)
    expect(node.length).to.be.equal(1)
>>>>>>> 7da76404... feat(admin-canary): refactor MenuCommunity comments
  })

  // it('render DropdownItem when data is passed', () => {
  //   node.setProps({ communities })

  //   expect(node.find(DropdownItem).length).to.be.equal(communities.length)
  //   expect(node.find(DropdownItem).at(0).props().children).to.be.equal('C1')
  //   expect(node.find(DropdownItem).at(1).props().children).to.be.equal('C2')
  // })

  // it('render DropdownItem with Link router', () => {
  //   const communities = [{ id: 1, name: 'C1' }]
  //   node.setProps({ communities })
  //   expect(node.find(DropdownItem).props().component).to.be.equal(Link)
  // })

  // it('mount path to redirect with id when pass path', () => {
  //   const communities = [{ id: 1, name: 'C1' }]
  //   node.setProps({ communities, path })
  //   expect(node.find(DropdownItem).props().to).to.be.equal()
  // })
<<<<<<< HEAD
// })
>>>>>>> 81d8afce... feat(admin-canary): refactor communitiesDropdown test
=======
})
>>>>>>> 4ecc3ef8... feat(admin-canary): refactor icons UserCommunities

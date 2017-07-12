import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import BlockConfigMenu from '~client/mobrender/components/block-config-menu'

describe('~client/mobrender/components/block-config-menu', () => {
  const props = {
    block: { id: 1, hidden: false }
  }
  let menuConfig
  beforeEach(() => {
    menuConfig = mount(<BlockConfigMenu {...props} />)
  })

  it('should render dropdown menu with options to action', () => {
    expect(menuConfig.find('DropdownMenu').length).to.equal(1)
    expect(menuConfig.find('DropdownMenu').find('DropdownMenuItem').length).to.equal(6)
  })

  it('should hide dropdown menu when display is false', () => {
    menuConfig.setProps({ display: false })
    expect(menuConfig.find('DropdownMenu').props().wrapperClassName).to.contains('display-none')
  })

  it('should show dropdown menu when display is true', () => {
    menuConfig.setProps({ display: true })
    expect(menuConfig.find('DropdownMenu').props().wrapperClassName).to.not.contains('display-none')
  })

  describe('should make menu item', () => {
    let menu

    describe('0: duplicate', () => {
      beforeEach(() => {
        menu = menuConfig.find('DropdownMenuItem').at(0)
      })

      it('should call duplicate when clicked', () => {
        let expected
        menuConfig.setProps({ duplicate: (block) => expected = block })
        menu.simulate('click')
        expect(expected).to.deep.equal(props.block)
      })
    })
    
    describe('1: change background', () => {
      beforeEach(() => {
        menu = menuConfig.find('DropdownMenuItem').at(1)
      })

      it('should call onEdit("background-{block_id}") when clicked', () => {
        let result
        menuConfig.setProps({ onEdit: turn => { result = turn } })
        menu.simulate('click')
        expect(result).to.equal(`background-${props.block.id}`)
      })

      it('should custom style to item', () => {
        expect(menu.props().className).to.equal('btn')
        expect(menu.find('i').props().className).to.equal('fa fa-picture-o')
        expect(menu.find('span').text()).to.equal(' Alterar fundo')
      })
    })

    describe('2: show/hide block', () => {
      beforeEach(() => {
        menu = menuConfig.find('DropdownMenuItem').at(2)
      })

      it('should call update with block.hidden updated', () => {
        let result
        menuConfig.setProps({ update: block => { result = block } })
        menu.simulate('click')
        expect(result).to.deep.equal({...props.block,
          hidden: !props.block.hidden
        })
      })

      it('should custom style to item', () => {
        expect(menu.props().className).to.equal('btn')
      })

      it('should custom style to item when block is hidden', () => {
        menuConfig.setProps({ block: { ...props.block, hidden: true } })
        expect(menu.find('span').text()).to.equal(' Mostrar')
        expect(menu.find('i').props().className).to.equal('fa fa-eye')
      })

      it('should custom style to item when block isnt hidden', () => {
        expect(menu.find('span').text()).to.equal(' Esconder')
        expect(menu.find('i').props().className).to.equal('fa fa-eye-slash')
      })
    })

    describe('3: remove block', () => {
      let confirmStub

      beforeEach(() => {
        confirmStub = sinon.stub(window, 'confirm')
        menu = menuConfig.find('DropdownMenuItem').at(3)
      })

      afterEach(() => {
        confirmStub.restore()
      })

      it('should call window.confirm when click', () => {
        menu.simulate('click')
        expect(confirmStub.called).to.equal(true)
      })

      it('should call destroy(block) when window.confirm is true', () => {
        let result
        menuConfig.setProps({ destroy: block => { result = block } })
        confirmStub.returns(true)
        menu.simulate('click')
        expect(result).to.deep.equal(props.block)
      })

      it('should custom style item', () => {
        expect(menu.props().className).to.equal('btn')
        expect(menu.find('span').text()).to.equal(' Remover')
        expect(menu.find('i').props().className).to.equal('fa fa-trash')
      })
    })

    describe('4: move up', () => {
      beforeEach(() => {
        menu = menuConfig.find('DropdownMenuItem').at(4)
      })

      it('should call moveUp(block) when click and canMoveUp', () => {
        let result
        menuConfig.setProps({
          moveUp: block => { result = block },
          canMoveUp: true
        })
        menu.simulate('click')
        expect(menu.props().disabled).to.equal(false)
        expect(result).to.deep.equal(props.block)
      })

      it('should disable button when !canMoveUp', () => {
        menuConfig.setProps({ canMoveUp: false })
        expect(menu.props().disabled).to.equal(true)
      })

      it('should custom style to item', () => {
        expect(menu.props().className).to.equal('btn')
        expect(menu.find('span').text()).to.equal(' Mover para cima')
        expect(menu.find('i').props().className).to.equal('fa fa-chevron-up')
      })
    })

    describe('5: move down', () => {
      beforeEach(() => {
        menu = menuConfig.find('DropdownMenuItem').at(5)
      })

      it('should call moveDown(block) when click and canMoveDown', () => {
        let result
        menuConfig.setProps({
          moveDown: block => { result = block },
          canMoveDown: true
        })
        menu.simulate('click')
        expect(result).to.deep.equal(props.block)
      })

      it('should disable button when !canMoveDown', () => {
        menuConfig.setProps({ canMoveDown: false })
        expect(menu.props().disabled).to.equal(true)
      })

      it('should custom style to item', () => {
        expect(menu.props().className).to.equal('btn')
        expect(menu.find('span').text()).to.equal(' Mover para baixo')
        expect(menu.find('i').props().className).to.equal('fa fa-chevron-down')
      })
    })
  })
})

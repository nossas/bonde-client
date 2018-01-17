import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { mountWithIntl } from '~root/intl/helpers'
import BlockConfigMenu from '~client/mobrender/components/block-config-menu'

describe('~client/mobrender/components/block-config-menu', () => {
  const props = {
    block: { id: 1, hidden: false }
  }
  let menuConfig
  beforeEach(() => {
    menuConfig = mountWithIntl(<BlockConfigMenu {...props} />)
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
    const menu = index => menuConfig.find('DropdownMenuItem').at(index)

    describe('0: duplicate', () => {
      it('should call duplicate when clicked', () => {
        let expected
        menuConfig.setProps({ duplicate: (block) => { expected = block } })
        menu(0).simulate('click')
        expect(expected).to.deep.equal(props.block)
      })
    })

    describe('1: change background', () => {
      it('should call onEdit("background-{block_id}") when clicked', () => {
        let result
        menuConfig.setProps({ onEdit: turn => { result = turn } })
        menu(1).simulate('click')
        expect(result).to.equal(`background-${props.block.id}`)
      })

      it('should custom style to item', () => {
        const text = 'Alterar fundo'
        expect(menu(1).props().className).to.equal('btn')
        expect(menu(1).find('i').props().className).to.equal('fa fa-picture-o')
        expect(menu(1).find('span FormattedMessage').props().defaultMessage).to.equal(text)
      })
    })

    describe('2: show/hide block', () => {
      it('should call update with block.hidden updated', () => {
        let result
        menuConfig.setProps({ update: block => { result = block } })
        menu(2).simulate('click')
        expect(result).to.deep.equal({...props.block,
          hidden: !props.block.hidden
        })
      })

      it('should custom style to item', () => {
        expect(menu(2).props().className).to.equal('btn')
      })

      it('should custom style to item when block is hidden', () => {
        menuConfig.setProps({ block: { ...props.block, hidden: true } })
        expect(menu(2).find('span FormattedMessage').props().defaultMessage).to.equal('Mostrar')
        expect(menu(2).find('i').props().className).to.equal('fa fa-eye')
      })

      it('should custom style to item when block isnt hidden', () => {
        expect(menu(2).find('span FormattedMessage').props().defaultMessage).to.equal('Esconder')
        expect(menu(2).find('i').props().className).to.equal('fa fa-eye-slash')
      })
    })

    describe('3: remove block', () => {
      let confirmStub

      beforeEach(() => {
        confirmStub = sinon.stub(window, 'confirm')
      })

      afterEach(() => {
        confirmStub.restore()
      })

      it('should call window.confirm when click', () => {
        menu(3).simulate('click')
        expect(confirmStub.called).to.equal(true)
      })

      it('should call destroy(block) when window.confirm is true', () => {
        let result
        menuConfig.setProps({ destroy: block => { result = block } })
        confirmStub.returns(true)
        menu(3).simulate('click')
        expect(result).to.deep.equal(props.block)
      })

      it('should custom style item', () => {
        expect(menu(3).props().className).to.equal('btn')
        expect(menu(3).find('span FormattedMessage').props().defaultMessage).to.equal('Remover')
        expect(menu(3).find('i').props().className).to.equal('fa fa-trash')
      })
    })

    describe('4: move up', () => {
      it('should call moveUp(block) when click and canMoveUp', () => {
        let result
        menuConfig.setProps({
          moveUp: block => { result = block },
          canMoveUp: true
        })
        menu(4).simulate('click')
        expect(menu(4).props().disabled).to.equal(false)
        expect(result).to.deep.equal(props.block)
      })

      it('should disable button when !canMoveUp', () => {
        menuConfig.setProps({ canMoveUp: false })
        expect(menu(4).props().disabled).to.equal(true)
      })

      it('should custom style to item', () => {
        const text = 'Mover para cima'
        expect(menu(4).props().className).to.equal('btn')
        expect(menu(4).find('span FormattedMessage').props().defaultMessage).to.equal(text)
        expect(menu(4).find('i').props().className).to.equal('fa fa-chevron-up')
      })
    })

    describe('5: move down', () => {
      it('should call moveDown(block) when click and canMoveDown', () => {
        let result
        menuConfig.setProps({
          moveDown: block => { result = block },
          canMoveDown: true
        })
        menu(5).simulate('click')
        expect(result).to.deep.equal(props.block)
      })

      it('should disable button when !canMoveDown', () => {
        menuConfig.setProps({ canMoveDown: false })
        expect(menu(5).props().disabled).to.equal(true)
      })

      it('should custom style to item', () => {
        const text = 'Mover para baixo'
        expect(menu(5).props().className).to.equal('btn')
        expect(menu(5).find('span FormattedMessage').props().defaultMessage).to.equal(text)
        expect(menu(5).find('i').props().className).to.equal('fa fa-chevron-down')
      })
    })
  })
})

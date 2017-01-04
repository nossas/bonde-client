import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { NewBlockPage } from '../../pages/NewBlockPage'
import { BLOCK_LAYOUTS } from '../../../constants/BlockLayouts'

describe('app/scripts/Block/components/NewBlockPage', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    blocks: {},
    auth: { credentials: {} },
    mobilization: { id: 1, color_scheme: 'meurio-scheme' },
    location: { pathname: '' }
  }

  describe('#render', () => {
    beforeEach(() => {
      wrapper = shallow(<NewBlockPage {...props} />)
    })

    it('should render root .new-block-page <div>', () => {
      expect(wrapper.find('div.new-block-page')).to.have.length(1)
    })

    describe('new block header', () => {
      it('should render one .new-block-header <div>', () => {
        expect(wrapper.find('div.new-block-header')).to.have.length(1)
      })
      it('should render one <h1>', () => {
        expect(wrapper.find('div.new-block-header h1')).to.have.length(1)
      })
      it('should render one <h1> with its content properly', () => {
        const text = 'Adicione um bloco de conteúdo'
        expect(wrapper.find('div.new-block-header h1').text()).to.be.equal(text)
      })
      it('should render one <Tabs> component', () => {
        const text = 'Adicione um bloco de conteúdo'
        expect(wrapper.find('div.new-block-header Tabs')).to.have.length(1)
      })
    })

    describe('block miniatures', () => {
      it(`should render ${BLOCK_LAYOUTS.length} <BlockMiniature> components`, () => {
        expect(wrapper.find('BlockMiniature')).to.have.length(BLOCK_LAYOUTS.length)
      })
    })

    describe('new block button', () => {
      it('should render one .new-block-button button', () => {
        expect(wrapper.find('button.new-block-button')).to.have.length(1)
      })
    })
  })
})

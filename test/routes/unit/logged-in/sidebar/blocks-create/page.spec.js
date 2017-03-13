import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { BLOCK_LAYOUTS } from '~mobilizations/blocks/constants'
import Page from '~routes/authenticated/sidebar/blocks-create/page'

describe('routes/application/blocks-create/page', () => {
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
      wrapper = shallow(<Page {...props} />)
    })

    it('should render root .block-create <div>', () => {
      expect(wrapper.find('div.block-create')).to.have.length(1)
    })

    describe('new block header', () => {
      it('should render one .block-create-header <div>', () => {
        expect(wrapper.find('div.block-create-header')).to.have.length(1)
      })
      it('should render one <h1>', () => {
        expect(wrapper.find('div.block-create-header h1')).to.have.length(1)
      })
      it('should render one <h1> with its content properly', () => {
        const text = 'Adicione um bloco de conteúdo'
        expect(wrapper.find('div.block-create-header h1').text()).to.be.equal(text)
      })
      it('should render one <Tabs> component', () => {
        expect(wrapper.find('div.block-create-header Tabs')).to.have.length(1)
      })
    })

    describe('block miniatures', () => {
      it(`should render ${BLOCK_LAYOUTS.length} <BlockMiniature> components`, () => {
        expect(wrapper.find('BlockMiniature')).to.have.length(BLOCK_LAYOUTS.length)
      })
    })

    describe('new block button', () => {
      it('should render one .block-create-button button', () => {
        expect(wrapper.find('button.block-create-button')).to.have.length(1)
      })
    })
  })
})

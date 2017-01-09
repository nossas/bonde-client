import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Mobilization } from '../../components'

describe('<Mobilization />', () => {
  let wrapper
  const props = {
    mobilization: {
      id: 1,
      color_scheme: 'meu-rio',
      header_font: 'headerFont',
      body_font: 'bodyFont',
      name: 'Lorem',
      goal: 'Lorem ipsum dolor',
      facebook_share_title: 'Facebook share title',
      facebook_share_description: 'Facebook share description',
      facebook_share_image: 'http://facebook.com/share-image.png'
    },
    blocks: [
      { id: 1, hidden: false, menu_hidden: false, mobilization_id: 1 },
      { id: 2, hidden: true, menu_hidden: true, mobilization_id: 1 }
    ],
    widgets: [
      { id: 1, block_id: 1 },
      { id: 2, block_id: 2 }
    ]
  }

  beforeEach(() => {
    wrapper = mount(<Mobilization {...props} />)
  })

  it('render without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('renders with color_scheme, header_font, body_font custom by default', () => {
    const { color_scheme, header_font, body_font } = props.mobilization
    const themeClassName = `.${color_scheme}.${header_font}-header.${body_font}-body`
    expect(wrapper.find(`div${themeClassName}`).length).to.equal(1)
  })

  it('renders Navbar with blocks and editable props passed', () => {
    expect(wrapper.find('Navbar').props().blocks).to.equal(props.blocks)
    expect(wrapper.find('Navbar').props().editable).to.equal(props.editable || false)
  })

  describe('when is editable', () => {
    beforeEach(() => {
      wrapper.setProps({ editable: true })
    })

    it('should renders relative layout classNames', () => {
      const layoutClassName = '.flex-auto.relative'
      const main = wrapper.find(`div${layoutClassName}`)
      expect(main.length).to.equal(1)
      expect(main.props().style).to.equal(undefined)
    })

    it('should not render DocumentMeta', () => {
      expect(wrapper.find('DocumentMeta').length).to.equal(0)
    })

    it('should render all blocks', () => {
      expect(wrapper.find('Block').length).to.equal(props.blocks.length)
    })
  })

  describe('when isnt editable', () => {
    beforeEach(() => {
      wrapper.setProps({ editable: false })
    })

    it('should renders absolute layout classNames', () => {
      const layoutClassName = '.absolute.flex'
      const main = wrapper.find(`div${layoutClassName}`)
      expect(main.length).to.equal(1)
      expect(main.props().style).to.deep.equal({ top: 0, bottom: 0, left: 0, right: 0 })
    })

    it('should render DocumentMeta with mobilization infos', () => {
      const meta = wrapper.find('DocumentMeta')
      const {
        name,
        goal,
        facebook_share_title,
        facebook_share_description,
        facebook_share_image
      } = props.mobilization

      const expected = {
        title: name,
        description: goal,
        meta: {
          name: {
            'viewport': 'width=device-width, initial-scale=1',
            'og:title': facebook_share_title,
            'og:description': facebook_share_description,
            'og:image': facebook_share_image
          }
        }
      }
      expect(meta.props()).to.deep.equal(expected)
    })

    it('should render only visible blocks', () => {
      const visibleBlocks = props.blocks.filter(b => !b.hidden)
      expect(wrapper.find('Block').length).to.equal(visibleBlocks.length)
    })
  })
})

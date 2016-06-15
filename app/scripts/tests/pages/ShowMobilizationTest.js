import React from 'react'
import TestUtils from 'react-addons-test-utils'
import DocumentMeta from 'react-document-meta'
import ShowMobilization from './../../pages/ShowMobilization'
import { Navbar, Block } from './../../components'

let component
let metaData

const mobilization = {
  id: 1,
  name: 'My Mobilization',
  goal: 'My goal',
  facebook_share_title: 'My Facebook share title',
  facebook_share_description: 'My Facebook share description',
  facebook_share_image: 'http://localhost:3001/my_facebook_share_image.png',
  color_scheme: 'my-color-scheme',
  header_font: 'my-header-font',
  body_font: 'my-header-font'
}

const block1 = { hidden: false, id: 1 }
const block2 = { hidden: false, id: 2 }
const block3 = { hidden: true, id: 3 }
const blocks = { data: [block1, block2, block3] }
const widgets = { data: [{}, {}] }

describe('ShowMobilization', () => {
  before(() => {
    component = TestUtils.renderIntoDocument(
      <ShowMobilization
        mobilization={mobilization}
        blocks={blocks}
        widgets={widgets}
      />
    )
  })

  describe('#render', () => {
    it('should render not hidden blocks', () => {
      expect(
        TestUtils.scryRenderedComponentsWithType(component, Block)
      ).to.have.length(2)
    })

    it('should render a Navbar', () => {
      expect(
        TestUtils.scryRenderedComponentsWithType(component, Navbar)
      ).to.have.length(1)
    })

    it('should render a DocumentMeta', () => {
      expect(
        TestUtils.scryRenderedComponentsWithType(component, DocumentMeta)
      ).to.have.length(1)
    })

    it('should render a div with the mobilization color scheme', () => {
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(component, mobilization.color_scheme)
      ).to.have.length(1)
    })

    it('should render a div with the mobilizations color scheme', () => {
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(component, mobilization.color_scheme)
      ).to.have.length(1)
    })

    it('should render a div with the mobilizations header font', () => {
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(component, `${mobilization.header_font}-header`)
      ).to.have.length.above(0)
    })

    it('should render a div with the mobilizations body font', () => {
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(component, `${mobilization.body_font}-body`)
      ).to.have.length.above(0)
    })
  })

  describe('#metaData', () => {
    before(() => {
      metaData = component.metaData(mobilization)
    })

    it('should set mobilizations name as title', () => {
      expect(metaData.title).to.be.eql(mobilization.name)
    })

    it('should set mobilizations goal as description', () => {
      expect(metaData.description).to.be.eql(mobilization.goal)
    })

    it('should set mobilizations Facebook share title as og:title', () => {
      expect(metaData.meta.name['og:title']).to.be.eql(mobilization.facebook_share_title)
    })

    it('should set mobilizations Facebook share description as og:description', () => {
      expect(metaData.meta.name['og:description']).to.be.eql(mobilization.facebook_share_description)
    })

    it('should set mobilizations Facebook share image as og:image', () => {
      expect(metaData.meta.name['og:image']).to.be.eql(mobilization.facebook_share_image)
    })

    it('should set a responsive viewport', () => {
      expect(metaData.meta.name.viewport).to.be.eql('width=device-width, initial-scale=1')
    })
  })
})

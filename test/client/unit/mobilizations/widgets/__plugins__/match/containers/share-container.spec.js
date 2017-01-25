import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { ShareContainer } from '~widget-plugins/match/containers/share-container'

describe('client/mobilizations/widgets/__plugins__/match/containers/share-container', () => {
  let wrapper
  let sandbox
  let spy = {}
  let params = { id: 65, widget_id: 96 }
  let match = {
    data: {
      first_choice: 'Foo Choice',
      second_choice: 'Bar Choice',
      goal_image: 'foo-bar-image.jpg',
      widget_title: 'Foo Bar Widget Title!'
    }
  }
  let props = { match, params }
  let store = {
    getState () { return match },
    subscribe: sinon.spy(),
    dispatch: sinon.spy()
  }

  beforeAll(() => {
    sandbox = sinon.sandbox.create()
    wrapper = shallow(<ShareContainer {...props} />)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    beforeAll(() => {
      spy.metaData = sandbox.spy(ShareContainer.prototype, 'metaData')
    })

    it('should render one empty <noscript> component', () => {
      expect(wrapper.html()).to.equal('')
    })
    it('should calls metaData method', () => {
      expect(spy.metaData).to.have.been.called
    })
  })

  describe('#metaData', () => {
    describe('meta objects', () => {
      const result = ShareContainer.prototype.metaData(props)

      it('should have meta prop', () => {
        expect(result).to.have.key('meta')
      })
      it('meta prop should be an object', () => {
        expect(result.meta).to.be.an.object
      })
      it('should have name prop inside meta object', () => {
        expect(result.meta).to.have.key('name')
      })
      it('name prop should be an object', () => {
        expect(result.meta.name).to.be.an.object
      })
      it('should have all required props inside name prop', () => {
        const keys = ['og:title', 'og:description', 'og:image']
        expect(result.meta.name).to.have.all.keys(keys)
      })
      it('og:title prop should be concatenation of first and second choices', () => {
        const expected = `${match.data.first_choice} + ${match.data.second_choice}`
        expect(result.meta.name['og:title']).to.equal(expected)
      })
      it('og:description prop should be equal as passed', () => {
        expect(result.meta.name['og:description']).to.equal(match.data.widget_title)
      })
      it('og:image prop should be equal as passed', () => {
        expect(result.meta.name['og:image']).to.equal(match.data.goal_image)
      })
    })
  })

  describe('#fetchData', () => {
    const result = ShareContainer.fetchData(store, params)

    it('should returns resolved promises', () => {
      expect(result.constructor).to.be.a.Promise
    })
  })
})

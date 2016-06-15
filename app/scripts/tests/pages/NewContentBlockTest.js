import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactS3Uploader from 'react-s3-uploader'

import { BlockMiniature, ColorPicker, Progress } from './../../components'
import NewBlock from './../../pages/NewBlock.jsx'
import { BLOCK_LAYOUTS } from './../../constants/BlockLayouts'

class NewBlockWithContext extends NewBlock {
  static childContextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      router: {}
    }
  }
}

describe('NewBlock', () => {
  let component

  beforeEach(() => {
    const mobilization = { id: 1, color_scheme: 'nossascidades-scheme' }
    const dispatch = () => {}
    const blocks = {}
    const auth = {}

    component = TestUtils.renderIntoDocument(
      <NewBlockWithContext
        mobilization={mobilization}
        dispatch={dispatch}
        blocks={blocks}
        auth={auth}
      />
    )
  })

  describe('#constructor', () => {
    it('should set initial state', () => {
      expect(component.state).to.eql({
        selectedLayout: BLOCK_LAYOUTS[0],
        bgClass: 'bg-1',
        bgImage: null,
        uploadProgress: null
      })
    })
  })

  describe('#handleMiniatureClick', () => {
    it('should set state selected layout', () => {
      component.handleMiniatureClick(BLOCK_LAYOUTS[1])
      expect(component.state.selectedLayout).to.eql(BLOCK_LAYOUTS[1])
    })
  })

  describe('#handleColorClick', () => {
    it('should set bg class to the selected bg class event current target', () => {
      const event = {currentTarget: {getAttribute() { return 'bg-purple' }}}
      component.handleColorClick(event)
      expect(component.state.bgClass).to.eql('bg-purple')
    })
  })

  // describe('#handleAddBlockClick', () => {
  //   it('should dispatch add block action', () => {
  //     const addBlockStub = sandbox.stub(BlockActions, 'addBlock')
  //     component.setState({
  //       selectedLayout: BLOCK_LAYOUTS[0],
  //       bgClass: 'bg-test',
  //       bgImage: 'foobar.jpg'
  //     })
  //     component.handleAddBlockClick()
  //     expect(addBlockStub).to.have.been.calledWith({
  //       router: component.context.router,
  //       mobilization_id: mobilization.id,
  //       block: {
  //         bg_class: 'bg-test',
  //         bg_image: 'foobar.jpg',
  //         widgets_attributes: [{kind: 'draft', sm_size: 12, md_size: 12, lg_size: 12}]
  //       }
  //     })
  //   })
  // })

  describe('#handleCancelClick', () => {
    it('transition to edit mobilization page', () => {
      component.context.router = { goBack() {} }
      const goBack = sandbox.stub(component.context.router, 'goBack')
      component.handleCancelClick()
      expect(goBack).to.have.been.calledOnce
    })
  })

  describe('#handleUploadProgress', () => {
    it('should set the progress', () => {
      component.handleUploadProgress(34)
      expect(component.state.uploadProgress).to.equal(34)
    })
  })

  describe('#handleUploadError', () => {
    it('should set the progress to null', () => {
      component.handleUploadError()
      expect(component.state.uploadProgress).to.be.null
    })
  })

  describe('#handleUploadFinish', () => {
    it('should set the progress to null and bg image to url', () => {
      const image = { signedUrl: 'http://foo.bar/foobar.jpg?abc=123' }
      component.handleUploadFinish(image)
      expect(component.state.uploadProgress).to.be.null
      expect(component.state.bgImage).to.equal('http://foo.bar/foobar.jpg')
    })
  })

  describe('#handleClearBgImage', () => {
    it('should clear the image', () => {
      sandbox.stub(window, 'confirm').returns(true)
      component.setState({bgImage: 'foo.gif'})
      component.handleClearBgImage()
      expect(component.state.bgImage).to.be.null
    })
  })

  describe('#render', () => {
    it('should render block miniatures', () => {
      const components = TestUtils.scryRenderedComponentsWithType(component, BlockMiniature)
      expect(components).to.have.length(4)
      components.forEach((miniature) => {
        expect(miniature.props.onClick.toString()).to.equal(component.handleMiniatureClick.bind(component).toString())
      })
    })

    it('should render uploader if not uploading', () => {
      component.setState({uploadProgress: null})
      const components = TestUtils.scryRenderedComponentsWithType(component, ReactS3Uploader)
      expect(components).to.have.length(1)
      expect(components[0].props.onProgress.toString()).to.equal(component.handleUploadProgress.bind(component).toString())
      expect(components[0].props.onError.toString()).to.equal(component.handleUploadError.bind(component).toString())
      expect(components[0].props.onFinish.toString()).to.equal(component.handleUploadFinish.bind(component).toString())
    })

    it('should not render uploader if uploading', () => {
      component.setState({uploadProgress: 1})
      const components = TestUtils.scryRenderedComponentsWithType(component, ReactS3Uploader)
      expect(components).to.have.length(0)
    })

    it('should render progress bar if uploading', () => {
      component.setState({uploadProgress: 1})
      const components = TestUtils.scryRenderedComponentsWithType(component, Progress)
      expect(components).to.have.length(1)
    })

    it('should not render progress bar if not uploading', () => {
      component.setState({uploadProgress: null})
      const components = TestUtils.scryRenderedComponentsWithType(component, Progress)
      expect(components).to.have.length(0)
    })

    it('should render color picker', () => {
      const components = TestUtils.scryRenderedComponentsWithType(component, ColorPicker)
      expect(components).to.have.length(1)
      expect(components[0].props.onClick.toString()).to.equal(component.handleColorClick.bind(component).toString())
    })

    it('should render buttons not disabled when not uploading', () => {
      const spyHandleCancelClick = sinon.spy()
      component.handleCancelClick = spyHandleCancelClick

      const spyHandleAddBlockClick = sinon.spy()
      component.handleAddBlockClick = spyHandleAddBlockClick

      component.setState({uploadProgress: null})
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons).to.have.length(3)
      expect(buttons[0].textContent.trim()).to.equal('Cancelar')
      expect(buttons[1].textContent.trim()).to.equal('Adicionar')
      expect(buttons[0].getAttribute('disabled')).to.be.null
      expect(buttons[1].getAttribute('disabled')).to.be.null

      TestUtils.Simulate.click(buttons[0])
      expect(spyHandleCancelClick).to.be.calledOnce

      TestUtils.Simulate.click(buttons[1])
      expect(spyHandleAddBlockClick).to.be.calledOnce
    })

    it('should render buttons disabled when uploading', () => {
      component.setState({uploadProgress: 1})
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons[0].getAttribute('disabled')).to.be.eql('')
      expect(buttons[1].getAttribute('disabled')).to.be.eql('')
    })

    it('should render bg image', () => {
      component.setState({bgImage: 'foo.jpg'})
      const images = TestUtils.scryRenderedDOMComponentsWithTag(component, 'img')
      expect(images).to.have.length(1)
      expect(images[0].getAttribute('src')).to.equal('foo.jpg')
    })

    it('should not render bg image when no image is set', () => {
      component.setState({bgImage: null})
      const images = TestUtils.scryRenderedDOMComponentsWithTag(component, 'img')
      expect(images).to.have.length(0)
    })
  })
})

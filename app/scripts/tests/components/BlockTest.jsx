import React from 'react'
import TestUtils from 'react-addons-test-utils'
import * as BlockActions from './../../actions/BlockActions'
import { Block, Widget, ColorPicker, DropDownMenu, DropDownMenuItem } from './../../components'

const widget1 = { block_id: 1, id: 1, settings: { content: 'My widget1' } }
const widget2 = { block_id: 2, id: 2, settings: { content: 'My widget2' } }
const allWidgets = {data: [widget1, widget2]}
const blockWidgets = [widget1]
const block = { id: 1, bg_class: 'bg-1', bg_image: 'foobar.jpg' }
const blocks = {}
const auth = {credentials: { x: 'y' }}
const dispatch = () => { return true }

const props = {
  widgets: allWidgets,
  blocks: blocks,
  block: block,
  auth: auth,
  dispatch: dispatch,
  mobilization: {},
  editable: true,
  canMoveUp: true,
  canMoveDown: true
}

describe('Block', () => {
  describe('#constructor', () => {
    it('should set initial state', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      expect(component.state).to.eql({
        hasMouseOver: false,
        editingBackground: false,
        editingWidget: false,
        bgClass: block.bg_class,
        bgImage: block.bg_image,
        uploadProgress: null,
        loading: false
      })
    })
  })

  describe('#filterWidgets', () => {
    it('should return widgets filtered by block_id', () => {
      const filteredWidgets = Block.prototype.filterWidgets(allWidgets.data, block)
      expect(filteredWidgets).to.include(widget1)
      expect(filteredWidgets).to.not.include(widget2)
    })
  })

  describe('#renderWidgets', () => {
    it('should return widgets components', () => {
      const renderedWidgets = Block.prototype.renderWidgets(allWidgets.data)
      expect(renderedWidgets).to.have.length(allWidgets.data.length)
      assert(TestUtils.isElementOfType(renderedWidgets[0], Widget))
      assert(TestUtils.isElementOfType(renderedWidgets[1], Widget))
    })
  })

  describe('#handleKeyUp', () => {
    it('should set editing background to false when pressed ESC key', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({editingBackground: true})
      component.handleKeyUp({keyCode: 27})
      expect(component.state.editingBackground).to.be.false
    })

    it('should not set editing background to false when pressed ESC key', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({editingBackground: true})
      component.handleKeyUp({keyCode: 13})
      expect(component.state.editingBackground).to.be.true
    })
  })

  describe('#handleCancelEdit', () => {
    it('should set editing background to false', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({
        editingBackground: true,
        bgClass: 'bg-foo',
        bgImage: 'foo.png'
      })
      component.handleCancelEdit()
      expect(component.state.editingBackground).to.be.false
      expect(component.state.bgClass).to.equal(block.bg_class)
      expect(component.state.bgImage).to.equal(block.bg_image)
    })
  })

  describe('#handleColorClick', () => {
    it('should set bg class to the selected bg class event current target', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      const event = {currentTarget: {getAttribute() { return 'bg-purple' }}}
      component.handleColorClick(event)
      expect(component.state.bgClass).to.eql('bg-purple')
    })
  })

  describe('#handleSaveEdit', () => {
    it('should dispatch edit block action', () => {
      const editBlockStub = sandbox.stub(BlockActions, 'editBlock')
      const component = TestUtils.renderIntoDocument(
        <Block {...props} mobilization={{id: 1}} />
      )
      component.setState({
        editingBackground: true,
        bgClass: 'bg-test',
        bgImage: 'foo.png'
      })
      component.handleSaveEdit()
      expect(component.state.editingBackground).to.be.false
      expect(editBlockStub).to.have.been.calledWith({
        mobilization_id: 1,
        block_id: block.id,
        block: {
          bg_class: 'bg-test',
          bg_image: 'foo.png'
        },
        credentials: auth.credentials
      })
    })
  })

  describe('#handleUploadProgress', () => {
    it('should set the progress', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.handleUploadProgress(34)
      expect(component.state.uploadProgress).to.equal(34)
    })
  })

  describe('#handleUploadError', () => {
    it('should set the progress to null', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.handleUploadError()
      expect(component.state.uploadProgress).to.be.null
    })
  })

  describe('#handleUploadFinish', () => {
    it('should set the progress to null and bg image to url', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      const image = { signedUrl: 'http://foo.bar/foobar.jpg?abc=123' }
      component.handleUploadFinish(image)
      expect(component.state.uploadProgress).to.be.null
      expect(component.state.bgImage).to.equal('http://foo.bar/foobar.jpg')
    })
  })

  describe('#handleEditBackgroundClick', () => {
    it('should set editing background to true', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({editingBackground: false})
      component.handleEditBackgroundClick()
      expect(component.state.editingBackground).to.be.true
    })
  })

  describe('#handleClearBgImage', () => {
    it('should clear the image', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      sandbox.stub(window, 'confirm').returns(true)
      component.setState({bgImage: 'foo.gif'})
      component.handleClearBgImage()
      expect(component.state.bgImage).to.be.null
    })
  })

  describe('#handleMoveUpClick', () => {
    it('should dispatch move block up action', () => {
      const moveBlockUpStub = sandbox.stub(BlockActions, 'moveBlockUp')
      const component = TestUtils.renderIntoDocument(
        <Block {...props} dispatch={() => {}} mobilization={{id: 1}} />
      )
      component.handleMoveUpClick()
      expect(moveBlockUpStub).to.have.been.calledWith({
        mobilization_id: 1,
        block: block,
        blocks: blocks,
        credentials: auth.credentials
      })
    })
  })

  describe('#handleMoveDownClick', () => {
    it('should dispatch move block down action', () => {
      const moveBlockDownStub = sandbox.stub(BlockActions, 'moveBlockDown')
      const component = TestUtils.renderIntoDocument(
        <Block {...props} dispatch={() => {}} mobilization={{id: 1}} />
      )
      component.handleMoveDownClick()
      expect(moveBlockDownStub).to.have.been.calledWith({
        mobilization_id: 1,
        block: block,
        blocks: blocks,
        credentials: auth.credentials
      })
    })
  })

  describe('#handleToggleHiddenClick', () => {
    it('should dispatch edit block action when visible', () => {
      const editBlockStub = sandbox.stub(BlockActions, 'editBlock')
      const component = TestUtils.renderIntoDocument(
        <Block
          {...props}
          dispatch={() => {}}
          mobilization={{id: 1}}
          block={{...block, hidden: false}}
        />
      )
      component.handleToggleHiddenClick()
      expect(editBlockStub).to.have.been.calledWith({
        mobilization_id: 1,
        block_id: block.id,
        block: { hidden: true },
        credentials: auth.credentials
      })
    })

    it('should dispatch edit block action when hidden', () => {
      const editBlockStub = sandbox.stub(BlockActions, 'editBlock')
      const component = TestUtils.renderIntoDocument(
        <Block
          {...props}
          dispatch={() => {}}
          mobilization={{id: 1}}
          block={{...block, hidden: true}}
        />
      )
      component.handleToggleHiddenClick()
      expect(editBlockStub).to.have.been.calledWith({
        mobilization_id: 1,
        block_id: block.id,
        block: { hidden: false},
        credentials: auth.credentials
      })
    })
  })

  describe('#handleRemoveClick', () => {
    it('should dispatch remove block action when confirmed', () => {
      sandbox.stub(window, 'confirm').returns(true)
      const removeBlockStub = sandbox.stub(BlockActions, 'removeBlock')
      const component = TestUtils.renderIntoDocument(
        <Block {...props} dispatch={() => {}} mobilization={{id: 1}} />
      )
      component.handleRemoveClick()
      expect(removeBlockStub).to.have.been.calledWith({
        mobilization_id: 1,
        block_id: block.id,
        credentials: auth.credentials
      })
    })

    it('should not dispatch remove block action when not confirmed', () => {
      sandbox.stub(window, 'confirm').returns(false)
      const removeBlockStub = sandbox.stub(BlockActions, 'removeBlock')
      const component = TestUtils.renderIntoDocument(
        <Block {...props} dispatch={() => {}} mobilization={{id: 1}} />
      )
      component.handleRemoveClick()
      expect(removeBlockStub).to.not.have.been.called
    })
  })

  describe('#handleMouseOver', () => {
    it('should set has mouse over to true', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({hasMouseOver: false})
      component.handleMouseOver()
      expect(component.state.hasMouseOver).to.be.true
    })
  })

  describe('#handleMouseOut', () => {
    it('should set has mouse over to false', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({hasMouseOver: true})
      component.handleMouseOut()
      expect(component.state.hasMouseOver).to.be.false
    })
  })

  describe('#render', () => {
    it('should render filtered widgets components', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} blocks={{}} />)
      const widgetsComponents = TestUtils.scryRenderedComponentsWithType(component, Widget)
      expect(widgetsComponents).to.have.length(blockWidgets.length)
    })

    it('should render DropDownMenu with display-none when mouse is out', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({hasMouseOver: false})
      const menus = TestUtils.scryRenderedComponentsWithType(component, DropDownMenu)
      expect(menus).to.have.length(1)
      expect(menus[0].props.wrapperClassName).to.contain('display-none')
    })

    it('should render DropDownMenu with display-none when block is not editable', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} editable={false} />)
      component.setState({hasMouseOver: true})
      const menus = TestUtils.scryRenderedComponentsWithType(component, DropDownMenu)
      expect(menus).to.have.length(1)
      expect(menus[0].props.wrapperClassName).to.contain('display-none')
    })

    it('should render DropDownMenu when mouse is over', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} editable />)
      component.setState({hasMouseOver: true})
      const menu = TestUtils.scryRenderedComponentsWithType(component, DropDownMenu)
      expect(menu).to.have.length(1)
      expect(menu[0].props.wrapperClassName).to.not.contain('display-none')
    })

    it('should render DropDownMenuItems', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items).to.have.length(5)
      expect(items[0].props.onClick.toString()).to.equal(component.handleEditBackgroundClick.bind(component).toString())
      expect(items[1].props.onClick.toString()).to.equal(component.handleToggleHiddenClick.bind(component).toString())
      expect(items[2].props.onClick.toString()).to.equal(component.handleRemoveClick.bind(component).toString())
      expect(items[3].props.onClick.toString()).to.equal(component.handleMoveUpClick.bind(component).toString())
      expect(items[4].props.onClick.toString()).to.equal(component.handleMoveDownClick.bind(component).toString())
    })

    it('should disable move up menu item when canMoveUp is false', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} canMoveUp={false} />)
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[3].props.disabled).to.be.true
    })

    it('should not disable move up menu item when canMoveUp is true', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} canMoveUp />)
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[3].props.disabled).to.be.false
    })

    it('should disable move down menu item when canMoveDown is false', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} canMoveDown={false} />)
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[4].props.disabled).to.be.true
    })

    it('should not disable move down menu item when canMoveDown is true', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} canMoveDown />)
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[4].props.disabled).to.be.false
    })

    it('should render color picker when editing background', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({editingBackground: true})
      const colorPicker = TestUtils.scryRenderedComponentsWithType(component, ColorPicker)
      expect(colorPicker).to.have.length(1)
    })

    it('should not render color picker when editing background', () => {
      const component = TestUtils.renderIntoDocument(<Block {...props} />)
      component.setState({editingBackground: false})
      const colorPicker = TestUtils.scryRenderedComponentsWithType(component, ColorPicker)
      expect(colorPicker).to.have.length(0)
    })
  })

  describe('#displayDropDownMenu', () => {
    it('should be false when editable is false', () => {

    })
  })
})

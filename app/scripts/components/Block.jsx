import React, { PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import { Widget, ColorPicker, DropDownMenu, DropDownMenuItem, Progress, Loading } from './'
import * as BlockActions from './../actions/BlockActions'
import { startEditingBlock, stopEditingBlock } from './../reducers/mobilizationEditor'

export default class Block extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    widgets: PropTypes.object.isRequired,
    auth: PropTypes.object,
    canMoveUp: PropTypes.bool,
    canMoveDown: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      editingBackground: false,
      editingWidget: false,
      bgClass: props.block.bg_class,
      bgImage: props.block.bg_image,
      uploadProgress: null,
      loading: false
    }
    const { dispatch } = this.props
    this.bindedBlockActions = bindActionCreators(BlockActions, dispatch)
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.editingBackground && !nextState.editingBackground) {
      this.props.dispatch(stopEditingBlock())
    } else if (!this.state.editingBackground && nextState.editingBackground) {
      this.props.dispatch(startEditingBlock())
    } else if (this.state.editingWidget && !nextState.editingWidget) {
      this.props.dispatch(stopEditingBlock())
    } else if (!this.state.editingWidget && nextState.editingWidget) {
      this.props.dispatch(startEditingBlock())
    }
  }

  componentWillReceiveProps() {
    if (this.state.loading) {
      this.setState({loading: false})
    }
  }

  filterWidgets(widgets, block) {
    return widgets.filter(function(widget) {
      return widget.block_id === block.id
    })
  }

  renderWidgets(widgets) {
    return widgets.map(function(widget) {
      return (
        <Widget
          {...this.props}
          key={'widget-' + widget.id}
          widget={widget} onEdit={::this.handleWidgetEdit} onCancelEdit={::this.handleWidgetCancelEdit} />
      )
    }.bind(this))
  }

  renderColorPicker() {
    if (this.state.editingBackground) {
      return (
        <div>
          <div className="absolute full-width top-0 left-0 bg-darken-4" style={{zIndex: 9999}}>
            <ColorPicker {...this.props} selectedClass={this.state.bgClass} onClick={::this.handleColorClick} />
            {this.renderBgImage()}
            <div className="col col-2 p1" style={{overflow: 'hidden'}}>
              {this.renderUploader()}
              {this.renderProgress()}
            </div>
          </div>
          <div className="absolute right-0 mt2 mr2 nowrap" style={{top: '3em', zIndex: 9999}}>
            <button className="button button-transparent caps bg-darken-4 white rounded mr1" disabled={!!this.state.uploadProgress} onClick={::this.handleSaveEdit}>Salvar</button>
            <button className="button button-transparent caps bg-darken-4 white rounded" disabled={!!this.state.uploadProgress} onClick={::this.handleCancelEdit}>Cancelar</button>
          </div>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleCancelEdit}
            style={{zIndex: 9998}} />
        </div>
      )
    }
  }

  handleUploadProgress(percent) {
    this.setState({uploadProgress: percent})
  }

  handleUploadError() {
    this.setState({uploadProgress: null})
  }

  handleUploadFinish(image) {
    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    this.setState({bgImage: imageUrl, uploadProgress: null})
  }

  renderUploader() {
    if (!this.state.uploadProgress) {
      return (
        <ReactS3Uploader
          signingUrl={`${process.env.API_URL}/uploads`}
          accept="image/*"
          onProgress={::this.handleUploadProgress}
          onError={::this.handleUploadError}
          onFinish={::this.handleUploadFinish}/>
      )
    }
  }

  renderProgress() {
    if (this.state.uploadProgress) {
      return (
        <Progress className="bg-blue" percent={this.state.uploadProgress} />
      )
    }
  }

  renderHiddenTag() {
    if (this.props.block.hidden) {
      return (
        <div className="absolute bottom-0 left-0 ml1 mb1 bg-darken-2 p1 white rounded">
          <i className="fa fa-eye-slash mr1" />
          Escondido
        </div>
      )
    }
  }

  renderBgImage() {
    if (this.state.bgImage) {
      return (
        <div>
          <div className="col col-1 p1">
            <img src={this.state.bgImage} style={{maxHeight: '36px'}} />
          </div>
          <div className="col col-1 p1">
            <button className="button button-transparent bg-darken-4 white rounded" onClick={::this.handleClearBgImage}><i className="fa fa-trash" /></button>
          </div>
        </div>
      )
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  handleClearBgImage() {
    if (confirm('Deseja remover a imagem de fundo?')) {
      this.setState({bgImage: null})
    }
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.setState({editingBackground: false})
    }
  }

  handleCancelEdit() {
    this.setState({
      editingBackground: false,
      bgClass: this.props.block.bg_class,
      bgImage: this.props.block.bg_image
    })
  }

  handleColorClick(event) {
    this.setState({bgClass: event.currentTarget.getAttribute('data-bg-class')})
  }

  handleSaveEdit() {
    const { mobilization, block, auth } = this.props
    this.setState({editingBackground: false, loading: true})
    this.bindedBlockActions.editBlock({
      mobilization_id: mobilization.id,
      block_id: block.id,
      credentials: auth.credentials,
      block: {
        bg_class: this.state.bgClass,
        bg_image: this.state.bgImage
      }
    })
  }

  handleEditBackgroundClick() {
    this.setState({editingBackground: true})
  }

  handleWidgetEdit() {
    this.setState({editingWidget: true})
  }

  handleWidgetCancelEdit() {
    this.setState({editingWidget: false})
  }

  handleMoveUpClick() {
    const { mobilization, block, blocks, auth } = this.props
    this.setState({loading: true})
    this.bindedBlockActions.moveBlockUp({
      credentials: auth.credentials,
      mobilization_id: mobilization.id,
      block: block,
      blocks: blocks
    })
  }

  handleMoveDownClick() {
    const { mobilization, block, blocks, auth } = this.props
    this.setState({loading: true})
    this.bindedBlockActions.moveBlockDown({
      credentials: auth.credentials,
      mobilization_id: mobilization.id,
      block: block,
      blocks: blocks
    })
  }

  handleToggleHiddenClick() {
    const { mobilization, block, auth } = this.props
    this.setState({loading: true})
    this.bindedBlockActions.editBlock({
      mobilization_id: mobilization.id,
      block_id: block.id,
      credentials: auth.credentials,
      block: { hidden: !block.hidden }
    })
  }

  handleRemoveClick() {
    const { mobilization, block, auth } = this.props
    if (confirm('Você tem certeza que quer remover este bloco?')) {
      this.setState({loading: true})
      this.bindedBlockActions.removeBlock({
        mobilization_id: mobilization.id,
        block_id: block.id,
        credentials: auth.credentials
      })
    }
  }

  handleMouseOver() {
    this.setState({hasMouseOver: true})
  }

  handleMouseOut() {
    this.setState({hasMouseOver: false})
  }

  displayDropDownMenu() {
    return (
      this.state.hasMouseOver &&
      !this.state.editingBackground &&
      !this.state.editingWidget &&
      !this.state.loading &&
      this.props.editable
    )
  }

  render() {
    // TODO: change widgets constant name to reflex the object that is returned
    // by the reducer
    const { widgets, block, canMoveUp, canMoveDown } = this.props
    const filteredWidgets = this.filterWidgets(widgets.data, block)
    const wrapperClassName = classnames(
      'm1 absolute bottom-0 right-0 z2',
      {'display-none': !this.displayDropDownMenu()}
    )
    return (
      <div
        id={'block-' + block.id}
        className={classnames('clearfix', block.bg_class, (block.bg_image ? 'bg-cover' : null))}
        onKeyUp={::this.handleKeyUp}
        onMouseOver={::this.handleMouseOver}
        onMouseOut={::this.handleMouseOut}
        style={(block.bg_image ? {backgroundImage: `url(${block.bg_image})`} : null)}>
        <div className="container">
          { this.renderColorPicker() }
          <div className="clearfix" style={{padding: '5em 0'}}>
            { this.renderWidgets(filteredWidgets) }
          </div>
          <div className="relative">
            { this.renderHiddenTag() }
          </div>
          { this.renderLoading() }
          <div className='relative'>
            <DropDownMenu
              wrapperClassName={wrapperClassName}
              menuClassName='bg-darken-4 rounded white right-0 top-0 mr4'
              buttonClassName='button bg-darken-4 white'
              icon="cog">
              <DropDownMenuItem
                onClick={::this.handleEditBackgroundClick}
                className="button button-transparent">
                <span>
                  <i className="fa fa-picture-o" /> Alterar fundo
                </span>
              </DropDownMenuItem>
              <DropDownMenuItem
                onClick={::this.handleToggleHiddenClick}
                className="button button-transparent">
                <span>
                  <i className={classnames('fa', (block.hidden ? 'fa-eye' : 'fa-eye-slash'))} />
                  {(block.hidden ? ' Mostrar' : ' Esconder')}
                </span>
              </DropDownMenuItem>
              <DropDownMenuItem
                onClick={::this.handleRemoveClick}
                className="button button-transparent">
                <span>
                  <i className="fa fa-trash" /> Remover
                </span>
              </DropDownMenuItem>
              <DropDownMenuItem
                disabled={!canMoveUp}
                onClick={::this.handleMoveUpClick}
                className="button button-transparent">
                <span>
                  <i className="fa fa-chevron-up" /> Mover para cima
                </span>
              </DropDownMenuItem>
              <DropDownMenuItem
                disabled={!canMoveDown}
                onClick={::this.handleMoveDownClick}
                className="button button-transparent">
                <span>
                  <i className="fa fa-chevron-down" /> Mover para baixo
                </span>
              </DropDownMenuItem>
            </DropDownMenu>
          </div>
        </div>
      </div>
    )
  }
}

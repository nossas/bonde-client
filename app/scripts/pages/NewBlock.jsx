import React, { PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import classnames from 'classnames'
import { BlockMiniature, ColorPicker, Progress, CloseButton } from './../components'
import { BLOCK_LAYOUTS } from '../constants/BlockLayouts'
import * as Paths from '../Paths'
import {addBlock} from '../reducers/blocks'

export default class NewBlock extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    blocks: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedLayout: BLOCK_LAYOUTS[0],
      bgClass: 'bg-1',
      bgImage: null,
      uploadProgress: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const {blocks, mobilization} = this.props

    if (blocks.data.length !== nextProps.blocks.data.length) {
      const {router} = this.context
      router.transitionTo(Paths.editMobilization(mobilization.id) + '?newBlock=true')
    }
  }

  handleMiniatureClick(layout) {
    this.setState({selectedLayout: layout})
  }

  handleColorClick(event) {
    this.setState({bgClass: event.currentTarget.getAttribute('data-bg-class')})
  }

  handleAddBlockClick() {
    const { dispatch, auth } = this.props

    const action = addBlock({
      mobilization_id: this.props.mobilization.id,
      credentials: auth.credentials,
      block: {
        bg_class: this.state.bgClass,
        bg_image: this.state.bgImage,
        widgets_attributes: this.state.selectedLayout.map((column) => {
          return { kind: 'draft', ...column }
        })
      }
    })

    dispatch(action)
  }

  handleCancelClick() {
    this.context.router.goBack()
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

  handleClearBgImage() {
    if (confirm('Deseja remover a imagem de fundo?')) {
      this.setState({bgImage: null})
    }
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

  renderBgImage() {
    if (this.state.bgImage) {
      return (
        <div>
          <div className="col col-1 p1">
            <img src={this.state.bgImage} />
          </div>
          <div className="col col-1 p1">
            <button className="button button-transparent bg-darken-4 white rounded" onClick={::this.handleClearBgImage}><i className="fa fa-trash" /></button>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={classnames('flex-auto bg-silver gray relative', this.props.mobilization.color_scheme)}>
        <h2 className="bg-white mt0 py3 px4">Adicione um bloco de conteúdo</h2>
        <div className="py1 px4">
          <p
            className="muted">
            Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento
          </p>
          <label className="caps h6 bold mb1 block">Tipo de bloco</label>
          <div className="mxn1">
            {BLOCK_LAYOUTS.map((layout, index) => {
              return (
                <BlockMiniature
                  key={index}
                  layout={layout}
                  selectedLayout={this.state.selectedLayout}
                  onClick={::this.handleMiniatureClick}
                />
              )
            })}
          </div>
          <div className="clearfix mb1">
            <label className="caps h6 bold mb1 block">Fundo (cor ou imagem)</label>
            <ColorPicker
              {...this.props}
              selectedClass={this.state.bgClass}
              onClick={::this.handleColorClick}
              colorScheme={this.props.mobilization.color_scheme.split('-')[0]}
            />
            {this.renderBgImage()}
            <div className="col col-2 p1" style={{overflow: 'hidden'}}>
              {this.renderUploader()}
              {this.renderProgress()}
            </div>
          </div>
          <div className="clearfix mb1">
            <button
              className="button bg-darken-3 rounded white caps button-transparent mr1"
              disabled={!!this.state.uploadProgress}
              onClick={::this.handleCancelClick}>
              Cancelar
            </button>
            <button
              className="button bg-aqua caps"
              disabled={!!this.state.uploadProgress}
              onClick={::this.handleAddBlockClick}>
              Adicionar
            </button>
          </div>
        </div>
        <CloseButton dirty={false} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }
}

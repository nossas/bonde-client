import React, { Component, PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import classnames from 'classnames'

import { Progress } from '../../../../components'

class ChoiceCombined extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadProgress: 0,
      uploadFinished: false
    }
  }

  handleUploadProgress(percent) {
    this.setState({ uploadProgress: percent })
  }

  handleUploadError() {
    this.setState({ uploadProgress: null })
  }

  handleUploadFinish(image) {
    const { match, handleUploadFinish } = this.props
    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    this.setState({
      bgImage: imageUrl,
      uploadProgress: 'success',
      uploadFinished: true
    })
    handleUploadFinish({
      ...match,
      goal_image: imageUrl
    })
  }

  render() {
    const { match, classes } = this.props
    const { uploadProgress, uploadFinished, bgImage } = this.state
    const uploadButtonColor = uploadProgress === 'success' ? 'bg-olive white' : null
    const placeholderImage = 'https://placeholdit.imgix.net/~text?txtsize=28&bg=e9e9e9&txtclr=364C5'
      + '5&txt=300%C3%97300&w=300&h=300&txt=Carregue%20uma%20imagem'
    const image = bgImage ? bgImage : (match.goal_image ? match.goal_image : placeholderImage)

    return (
      <div className={classnames('clearfix mb3 md-col md-col-3 px1', classes)}>
        <div
          className="square coverImage clearfix mb1"
          style={{ backgroundImage: `url('${image}')` }}>
        </div>
        <div className="md-col md-col-12 mb1">
          <ReactS3Uploader
            className={classnames('md-col md-col-12 btn h5 rounded', uploadButtonColor)}
            signingUrl={`${process.env.API_URL}/uploads`}
            accept="image/*"
            onProgress={::this.handleUploadProgress}
            onError={::this.handleUploadError}
            onFinish={::this.handleUploadFinish} />

          <div className="md-col md-col-12" style={{ marginTop: '3px' }}>
            { !uploadFinished && !!uploadProgress
              && <Progress
                className="bg-olive"
                percent={this.state.uploadProgress}
                style={{ height: '6px' }} /> }
          </div>
        </div>
        <div className="md-col md-col-12 center">
          <div className="border rounded p1 border-navy navy">{match.first_choice}</div>
          <div className="navy">+</div>
          <div className="border rounded p1 border-navy navy">{match.second_choice}</div>
        </div>
      </div>
    )
  }
}

ChoiceCombined.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.array
}

export default ChoiceCombined

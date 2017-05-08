import PropTypes from 'prop-types';
import React from 'react';
import ReactS3Uploader from 'react-s3-uploader'
import { Progress } from '~client/components/await'
import DefaultServerConfig from '~server/config'

const FileUploader = ({ file, onRemove, progress, onProgress, onFinish }) => (
  <div>
    {file && (
      <div className='col col-1 p1'>
        <img src={file} style={{ maxHeight: '36px' }} />
        {onRemove && (
          <button
            className='btn bg-darken-4 white rounded remove'
            style={{ margin: '-25px 10px 0' }}
            onClick={() => {
              if (window.confirm('Deseja remover a imagem de fundo?')) {
                onRemove(file)
              }
            }}
          >
            <i className='fa fa-trash' />
          </button>)}
      </div>
    )}
    <div className='col col-2 p1'>
    {!progress ? (
      <ReactS3Uploader
        className='input border-none white m0 bg-darken-4'
        accept='image/*'
        signingUrl={`${DefaultServerConfig.apiUrl}/uploads`}
        onProgress={percent => onProgress(percent)}
        onFinish={image => {
          const url = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
          onFinish(url)
        }}
      />
    ) : (
      <Progress
        className='bg-pagenta full-height rounded'
        percent={progress}
        style={{ height: '34px' }}
      />
    )}
    </div>
  </div>
)

FileUploader.propTypes = {
  file: PropTypes.string,
  onRemove: PropTypes.func,
  progress: PropTypes.number,
  onProgress: PropTypes.func,
  onFinish: PropTypes.func
}

export default FileUploader

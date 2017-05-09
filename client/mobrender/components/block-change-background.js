import PropTypes from 'prop-types'
import React from 'react'
import { BasicColorPicker } from '~client/components/basic-color-picker'
import FileUploader from './file-uploader'

export const BLOCK_UPLOAD_KEY = 'bgBlock'

const BlockChangeBackground = ({ block, onChangeBackground, progress, onUploadFile, onCancelEdit, update }) => (
  <div className='absolute col-12 top-0 left-0 bg-darken-4 z5'>
    <div className='z4'>
      <BasicColorPicker
        colors={['bg-1', 'bg-2', 'bg-3', 'bg-4']}
        selected={block.bg_class}
        onSelectColor={color => {
          onChangeBackground({ ...block, bg_class: color })
        }}
      />
      <FileUploader
        file={block.bg_image}
        progress={progress}
        onProgress={progress => onUploadFile(BLOCK_UPLOAD_KEY, progress)}
        onRemove={() => onChangeBackground({ ...block, bg_image: undefined })}
        onFinish={file => {
          onUploadFile(BLOCK_UPLOAD_KEY)
          onChangeBackground({...block, bg_image: file})
        }}
      />
      <div className='absolute right-0 mt2 mr2 nowrap'>
        <button
          className='btn caps bg-darken-4 white rounded mr1 save-btn'
          disabled={progress !== undefined}
          onClick={() => {
            update(block)
            onCancelEdit(block)
          }}
        >
          Salvar
        </button>
        <button
          className='btn caps bg-darken-4 white rounded cancel-btn'
          onClick={() => onCancelEdit(block)}
        >
          Cancelar
        </button>
      </div>
    </div>
    <div
      className='fixed top-0 right-0 bottom-0 left-0'
      style={{ marginTop: '50px' }}
      onClick={() => onCancelEdit(block)}
    />
  </div>
)

BlockChangeBackground.propTypes = {
  block: PropTypes.object.isRequired,
  // Injected by redux
  update: PropTypes.func.isRequired,
  onChangeBackground: PropTypes.func,
  onCancelEdit: PropTypes.func,
  onUploadFile: PropTypes.func,
  progress: PropTypes.number
}

export default BlockChangeBackground

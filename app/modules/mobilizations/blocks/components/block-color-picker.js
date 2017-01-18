import React, { PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'

import { ColorPicker, Progress } from '../../../../scripts/components'
import { actions as BlockActions } from '../../../mobilizations/blocks'

const BlockColorPicker = ({ state, props, onChange }) => {
  const { mobilization, block, dispatch } = props
  const { asyncBlockUpdate } = BlockActions

  return (
    <div>
      <div className="absolute col-12 top-0 bg-darken-4 z5" style={{ left: '0px' }}>
        <div className="col-7">
          <ColorPicker
            {...props}
            selectedClass={state.bgClass}
            onClick={event => {
              onChange({ bgClass: event.currentTarget.getAttribute('data-bg-class') })
            }}
          />
        </div>
        {
          state.bgImage && (
            <div className="col col-1">
              <div className="col col-6 p1">
                <img src={state.bgImage} style={{ maxHeight: '36px' }} />
              </div>
              <div className="col col-6 p1">
                <button
                  className="btn bg-darken-4 white rounded"
                  onClick={() => {
                    if (confirm('Deseja remover a imagem de fundo?')) {
                      onChange({ bgImage: null })
                    }
                  }}
                >
                  <i className="fa fa-trash" />
                </button>
              </div>
            </div>
          )
        }
        <div className="col col-2 p1" style={{ overflow: 'hidden' }}>
          {!state.uploadProgress && (
            <ReactS3Uploader
              className="input border-none white m0 bg-darken-4"
              signingUrl={`${process.env.API_URL}/uploads`}
              accept="image/*"
              onProgress={percent => onChange({ uploadProgress: percent })}
              onError={() => onChange({ uploadProgress: null })}
              onFinish={image => {
                const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
                onChange({ bgImage: imageUrl, uploadProgress: null })
              }}
            />
          )}
          {state.uploadProgress && (
            <Progress
              className="bg-pagenta full-height rounded"
              percent={state.uploadProgress}
              style={{ height: '34px' }}
            />
          )}
        </div>
      </div>
      <div className="absolute right-0 mt2 mr2 nowrap z5" style={{ top: '3em' }}>
        <button
          className="btn caps bg-darken-4 white rounded mr1"
          disabled={!!state.uploadProgress}
          onClick={() => {
            onChange({ editingBackground: false, loading: true })
            dispatch(
              asyncBlockUpdate({
                mobilization,
                block: {
                  ...block,
                  bg_class: state.bgClass,
                  bg_image: state.bgImage
                }
              })
            )
          }}
        >
          Salvar
        </button>
        <button
          className="btn caps bg-darken-4 white rounded"
          disabled={!!state.uploadProgress}
          onClick={() => handleCancelEdit({ onChange, props })}
        >
          Cancelar
        </button>
      </div>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z4"
        onClick={() => handleCancelEdit({ onChange, props })}
      />
    </div>
  )
}

const handleCancelEdit = ({ props, onChange }) => {
  onChange({
    editingBackground: false,
    bgClass: props.block.bg_class,
    bgImage: props.block.bg_image
  })
}

BlockColorPicker.propTypes = {
  props: PropTypes.shape({
    mobilization: PropTypes.object,
    block: PropTypes.object,
    dispatch: PropTypes.func,
  }),
  state: PropTypes.shape({
    bgClass: PropTypes.string,
    bgImage: PropTypes.string,
    uploadProgress: PropTypes.number,
  }),
  onChange: PropTypes.func,
}

export default BlockColorPicker

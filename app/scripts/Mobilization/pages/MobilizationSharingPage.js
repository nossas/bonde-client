import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import ReactS3Uploader from 'react-s3-uploader'

import { Label, InputCounter } from '../../components'
import * as Selectors from '../MobilizationSelectors'
import * as MobilizationActions from '../MobilizationActions'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../Dashboard/Forms'
import { SettingsPageContentLayout } from '../../../components/Layout'
import iconFacebook from './images/facebook.svg'
import iconTwitter from './images/twitter.svg'

const MobilizationSharingPage = ({
  ...rest,
  fields: {
    facebook_share_image: facebookShareImage,
    facebook_share_title: facebookShareTitle,
    facebook_share_description: facebookShareDescription,
    twitter_share_text: twitterShareText
  },
  dispatch,
  mobilization,
  isFacebookShareImageUploading,
  // Actions
  editMobilizationAsync,
  progressUploadFacebookImage,
  finishUploadFacebookImage
}) => {
  const handleSubmit = values => editMobilizationAsync({ ...mobilization, ...values })

  return (
    <SettingsPageContentLayout className='darkengray'>
      <FormRedux
        {...rest}
        onSubmit={handleSubmit}
        className='transparent clearfix'
        floatButton='Salvar'
        successMessage='Furmlário atualizado com sucesso!'
      >
        <div className='h5 caps bold mb2 inline'>
          <img className='align-middle' src={iconFacebook} width='32' height='32' />
          <span className='align-middle pl2 h6'>Share de Facebook</span>
        </div>
        <p className='mb2 lightgray'>
          Configure o post que será publicado no Facebook sempre que alguém compartilhar a ação.
          É importante que esses textos sejam cativantes e curtos para não aparecerem cortados. :)
        </p>

        <div className='form-group col col-5 mb3' style={{ paddingRight: '.7rem' }}>
          <Label htmlFor='facebookShareImage'>Imagem</Label>
          <div
            className='border border-gray94 rounded p2 bg-white center relative overflow-hidden'
            style={{ height: '226px' }}
          >
            <div className='clearfix'>
              {
                facebookShareImage.value ? (
                  <div
                    className='bg-cover square'
                    style={{ backgroundImage: `url(${facebookShareImage.value})` }}
                  />
                ) : (
                  <div className='square-float'>
                    <i className='fa fa-image silver mt2 mb1' style={{ fontSize: '5em' }} />
                  </div>
                )
              }
              <div className={facebookShareImage.value ? 'hide' : null}>
                <div className='mb1 gray'>Sua imagem deve ter 470x270 pixels</div>
              </div>
              <div className='overflow-hidden'>
                {
                  isFacebookShareImageUploading
                  ? <i className='fa fa-spin fa-refresh' />
                  : <ReactS3Uploader
                    id='facebookShareImage'
                    signingUrl={`${process.env.API_URL}/uploads`}
                    accept='image/*'
                    onProgress={() =>
                      !isFacebookShareImageUploading && dispatch(progressUploadFacebookImage())
                    }
                    onFinish={image => {
                      const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
                      facebookShareImage.onChange(imageUrl)
                      dispatch(finishUploadFacebookImage())
                    }}
                    className='border-none bg-darken-4 rounded p1 white'
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '1rem',
                      width: '80%',
                      marginLeft: '-40%'
                    }}
                  />
                }
              </div>
            </div>
          </div>
        </div>

        <div className='col col-7'>
          <FormGroup
            {...facebookShareTitle}
            controlId='facebookShareTitle'
            style={{ paddingLeft: '0' }}
          >
            <ControlLabel className='ml1'>
              Título do post
              <InputCounter
                maxLength={70}
                length={facebookShareTitle.value ? facebookShareTitle.value.length : 0}
                className='right regular'
              />
            </ControlLabel>
            <FormControl
              componentClass='textarea'
              rows='2'
              placeholder='Um título direto que passe a ideia da sua mobilização'
              maxLength={70}
              style={{ paddingTop: '1.35rem', paddingBottom: '1.35rem' }}
            />
          </FormGroup>

          <FormGroup
            {...facebookShareDescription}
            controlId='facebookShareDescription'
            style={{ paddingLeft: '0' }}
          >
            <ControlLabel className='ml1'>
              Subtítulo do post
              <InputCounter
                maxLength={90}
                length={facebookShareDescription.value ? facebookShareDescription.value.length : 0}
                className='right regular'
              />
            </ControlLabel>
            <FormControl
              componentClass='textarea'
              rows='2'
              placeholder='Complete a informação do título e chame o leitor para a mobilização'
              maxLength={90}
              style={{ paddingTop: '1.35rem', paddingBottom: '1.35rem' }}
            />
          </FormGroup>
        </div>

        <div className='col col-12'>
          <div className='h5 caps bold mb2 inline'>
            <img className='align-middle' src={iconTwitter} width='32' height='32' />
            <span className='align-middle pl2 h6'>Share de Twitter</span>
          </div>
          <p className='mb2 lightgray'>
            Configure a mensagem que será publicada no Twitter
            sempre que alguém compartilhar sua mobilização.
          </p>

          <FormGroup controlId='twitterShareText' {...twitterShareText}>
            <ControlLabel>
              Texto do Tweet
              <InputCounter
                maxLength={140}
                length={twitterShareText.value ? twitterShareText.value.length : 0}
                className='right regular'
              />
            </ControlLabel>
            <FormControl
              componentClass='textarea'
              placeholder='Insira uma frase e chame o leitor para a mobilização'
              maxLength={140}
            />
          </FormGroup>
        </div>
      </FormRedux>
    </SettingsPageContentLayout>
  )
}

MobilizationSharingPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  mobilization: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFacebookShareImageUploading: PropTypes.bool.isRequired,
  // Actions
  editMobilizationAsync: PropTypes.func.isRequired,
  progressUploadFacebookImage: PropTypes.func.isRequired,
  finishUploadFacebookImage: PropTypes.func.isRequired
}

MobilizationSharingPage.defaultProps = {
  isFacebookShareImageUploading: false
}

const fields = [
  'facebook_share_title',
  'facebook_share_description',
  'facebook_share_image',
  'twitter_share_text'
]
const mapStateToProps = (state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    mobilization,
    initialValues: mobilization || {},
    isFacebookShareImageUploading: state.mobilization.isFacebookShareImageUploading
  }
}

export default reduxForm({
  form: 'mobilizationForm',
  fields
}, mapStateToProps, { ...MobilizationActions })(MobilizationSharingPage)

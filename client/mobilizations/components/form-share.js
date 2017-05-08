import PropTypes from 'prop-types'
import React from 'react'
import { reduxForm } from 'redux-form'

import serverConfig from '~server/config'
import { FormGroup, ControlLabel, FormControl, UploadImageField } from '~client/components/forms'

const FormShare = ({
  FormComponent,
  fields: {
    facebook_share_image: facebookShareImage,
    facebook_share_title: facebookShareTitle,
    facebook_share_description: facebookShareDescription,
    twitter_share_text: twitterShareText
  },
  ...formProps
}) => (
  <FormComponent {...formProps}>
    <div className='h6 caps bold mb2 inline'>
      <i className='fa fa-facebook-square align-middle' style={{ color: '#3b5998' }} />
      <span className='align-middle pl2'>Share de Facebook</span>
    </div>
    <p className='mb2 lightgray'>
      Configure o post que será publicado no Facebook sempre que alguém compartilhar a ação.
      É importante que esses textos sejam cativantes e curtos para não aparecerem cortados. :)
    </p>

    <div className='clearfix col-12'>
      <FormGroup
        contorlId='facebookShareImage'
        className='facebook-share-image col col-5'
        {...facebookShareImage}
      >
        <ControlLabel>Imagem</ControlLabel>
        <UploadImageField signingUrl={`${serverConfig.apiUrl}/uploads`} />
      </FormGroup>

      <div className='facebook-share-title-container col col-7'>
        <FormGroup
          {...facebookShareTitle}
          controlId='facebookShareTitle'
          className='facebook-share-title'
          style={{ paddingLeft: '0' }}
        >
          <ControlLabel className='ml1' maxLength={70}>Título do post</ControlLabel>
          <FormControl
            componentClass='textarea'
            rows={2}
            maxLength={70}
            placeholder='Um título direto que passe a ideia da sua mobilização'
          />
        </FormGroup>

        <FormGroup
          controlId='facebookShareDescription'
          className='facebook-share-description'
          style={{ paddingLeft: '0' }}
          {...facebookShareDescription}
        >
          <ControlLabel className='ml1' maxLength={90}>Subtítulo do post</ControlLabel>
          <FormControl
            componentClass='textarea'
            rows={4}
            maxLength={90}
            placeholder='Complete a informação do título e chame o leitor para a mobilização'
          />
        </FormGroup>
      </div>
    </div>

    <div className='separator' />

    <div className='clearfix col col-12'>
      <div className='h6 caps bold mb2 inline'>
        <i className='fa fa-twitter align-middle' style={{ color: '#1da1f2' }} />
        <span className='align-middle pl2'>Share de Twitter</span>
      </div>
      <p className='mb2 lightgray'>
        Configure a mensagem que será publicada no Twitter
        sempre que alguém compartilhar sua mobilização.
      </p>

      <FormGroup
        controlId='twitterShareText' {...twitterShareText}
        className='twitter-share-text'
      >
        <ControlLabel maxLength={140}>Texto do Tweet</ControlLabel>
        <FormControl
          componentClass='textarea'
          rows={5}
          maxLength={140}
          placeholder='Insira uma frase e chame o leitor para a mobilização'
        />
      </FormGroup>
    </div>
  </FormComponent>
)

FormShare.propTypes = {
  FormComponent: PropTypes.node,
  fields: PropTypes.shape({
    facebook_share_image: PropTypes.object.isRequired,
    facebook_share_title: PropTypes.object.isRequired,
    facebook_share_description: PropTypes.object.isRequired,
    twitter_share_text: PropTypes.object.isRequired
  }).isRequired
}

const fields = [
  'id',
  'facebook_share_image',
  'facebook_share_title',
  'facebook_share_description',
  'twitter_share_text'
]

export default (
  mapStateToProps = () => {},
  mapDispatchToProps = {},
  validate = () => ({})
) => reduxForm(
  { form: 'mobilizationShareForm', fields, validate },
  mapStateToProps,
  mapDispatchToProps
)(FormShare)

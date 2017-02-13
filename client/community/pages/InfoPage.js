import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

// Global module dependencies
import {
  FormRedux,
  SubmitButton,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage
} from '~components/forms'
import { FloatLayout } from '~components/grids'

// Current module dependencies
import { ForceDownloadViaAjax } from '../components'
import { edit, downloadActivists } from '../actions'

class InfoPage extends Component {
  onClickItem (community) {
    this.props.downloadActivists(community)
  }

  render () {
    const { community, fields: { image, name, city, description }, ...formProps } = this.props

    return (
      <FormRedux nosubmit {...formProps}>
        <FormGroup controlId='imageId' {...image}>
          <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
        </FormGroup>
        <FormGroup controlId='nameId' {...name}>
          <ControlLabel>Nome</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='descriptionId' {...description}>
          <ControlLabel>Descrição</ControlLabel>
          <FormControl componentClass='textarea' />
        </FormGroup>
        <FormGroup controlId='cityId' {...city}>
          <ControlLabel>Cidade</ControlLabel>
          <FormControl type='text' />
        </FormGroup>

        <ForceDownloadViaAjax
          title='Baixar resumo de ações dos ativistas'
          onClick={this.onClickItem.bind(this, community)}
        />

        <FloatLayout position='floatTopRight'>
          <SubmitButton>Salvar</SubmitButton>
          <SuccessMessage text='Dados editados com sucesso.' />
        </FloatLayout>
      </FormRedux>
    )
  }
}

const fields = ['id', 'image', 'name', 'city', 'description']

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Informe o nome da comunidade'
  }
  if (!values.city) {
    errors.city = 'Informe em qual cidade sua comunidade atua'
  }
  return errors
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      ...ownProps.community
    }
  }
}

export default reduxForm({
  form: 'editCommunityForm',
  fields,
  validate
}, mapStateToProps, { submit: edit, downloadActivists })(InfoPage)

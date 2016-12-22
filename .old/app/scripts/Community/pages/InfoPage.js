import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { edit } from '../actions'

import {
  FormRedux,
  SubmitButton,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage
} from '../../Dashboard/Forms'
import { FloatLayout } from '../../Dashboard/Grids'


class InfoPage extends Component {

  render() {
    const { fields: { image, name, city, description }, ...formProps } = this.props

    return (
      <FormRedux nosubmit {...formProps}>
        <FormGroup controlId="imageId" {...image}>
          <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
        </FormGroup>
        <FormGroup controlId="nameId" {...name}>
          <ControlLabel>Nome</ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup controlId="descriptionId" {...description}>
          <ControlLabel>Descrição</ControlLabel>
          <FormControl componentClass="textarea" />
        </FormGroup>
        <FormGroup controlId="cityId" {...city}>
          <ControlLabel>Cidade</ControlLabel>
          <FormControl type="text" />
        </FormGroup>

        <FloatLayout position="floatTopRight">
          <SubmitButton>Salvar</SubmitButton>
          <SuccessMessage text="Dados editados com sucesso." />
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
    },
  }
}

export default reduxForm({
  form: 'editCommunityForm',
  fields,
  validate
}, mapStateToProps, { submit: edit })(InfoPage)

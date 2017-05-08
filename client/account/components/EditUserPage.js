import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form'

import { Tabs, Tab } from '../../../components/Navigation'
import { SettingsPageLayout, SettingsPageMenuLayout, SettingsPageContentLayout } from '../../../components/Layout'
import {
  FormRedux,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage
} from '../../Dashboard/Forms'
import { FloatLayout } from '../../Dashboard/Grids'
import { edit } from '../actions'

const EditUserPage = ({
  fields: {
    avatar,
    first_name: firstName,
    last_name: lastName,
    email
  },
  editAccount,
  ...formProps
}) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout title='Minha conta'>
      <Tabs>
        <Tab
          text='Usuário'
          isActive
        />
      </Tabs>
    </SettingsPageMenuLayout>
    <SettingsPageContentLayout>
      {/* TODO: Change FormRedux to be transparent by default */}
      <FormRedux
        nosubmit
        className='transparent'
        successMessage='Dados atualizados com sucesso.'
        onSubmit={values => editAccount(values)} {...formProps}
      >
        <FormGroup controlId='avatarId' {...avatar}>
          <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
        </FormGroup>
        <FormGroup controlId='firstNameId' {...firstName}>
          <ControlLabel>Nome</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='lastNameId' {...lastName}>
          <ControlLabel>Sobrenome</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='emailId' {...email}>
          <ControlLabel>E-mail</ControlLabel>
          <FormControl type='email' />
        </FormGroup>

        <FloatLayout position='floatTopRight'>
          <Button>Salvar</Button>
          <SuccessMessage text='Dados editados com sucesso.' />
        </FloatLayout>
      </FormRedux>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

EditUserPage.propTypes = {
  // Injected by react-redux
  auth: PropTypes.object.isRequired
}

const fields = ['id', 'avatar', 'first_name', 'last_name', 'email']

export default reduxForm({
  form: 'editUserForm',
  fields
}, (state, ownProps) => ({
  auth: state.auth,
  initialValues: {  // gambiarra para ajudar o amigo do backend
    ...state.auth.user,
    avatar: state.auth.user.avatar_url
  }
}), { editAccount: edit })(EditUserPage)

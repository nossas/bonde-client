import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { Tabs, Tab } from '../../../components/Navigation'
import { SettingsPageLayout, SettingsPageMenuLayout, SettingsPageContentLayout } from '../../../components/Layout'
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
import { edit } from '../actions'

class EditUserPage extends Component {

  render() {
    const { editAccount, fields: { avatar, first_name, last_name, email }, ...formProps } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Minha conta">
          <Tabs>
            <Tab
              text="Usuário"
              isActive={true}
            />
          </Tabs>
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout>
          {/* TODO: Change FormRedux to be transparent by default */}
          <FormRedux
            nosubmit
            className="transparent"
            successMessage="Dados atualizados com sucesso."
            onSubmit={values => editAccount(values)} {...formProps}
          >
            <FormGroup controlId="avatarId" {...avatar}>
              <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
            </FormGroup>
            <FormGroup controlId="firstNameId" {...first_name}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text" />
            </FormGroup>
            <FormGroup controlId="lastNameId" {...last_name}>
              <ControlLabel>Sobrenome</ControlLabel>
              <FormControl type="text" />
            </FormGroup>
            <FormGroup controlId="emailId" {...email}>
              <ControlLabel>E-mail</ControlLabel>
              <FormControl type="email" />
            </FormGroup>

            <FloatLayout position="floatTopRight">
              <SubmitButton>Salvar</SubmitButton>
              <SuccessMessage text="Dados editados com sucesso." />
            </FloatLayout>
          </FormRedux>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

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
  },
}), { editAccount: edit })(EditUserPage)

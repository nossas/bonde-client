//
// @route /account/edit
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import AuthSelectors from 'account/redux/selectors'
import { asyncUpdateUser } from 'account/redux/action-creators'
import Page from './page'

const fields = ['id', 'avatar', 'first_name', 'last_name', 'email']

const mapStateToProps = (state, props) => {
  const user = AuthSelectors(state, props).getUser()
  return {
    initialValues: {
      id: user.id,
      first_name: user.firstName || user.first_name,
      last_name: user.lastName || user.last_name,
      avatar: user.avatar || user.avatar_url,
      email: user.email
    }
  }
}

const mapActionsToProps = {
  submit: asyncUpdateUser
}

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'editUserForm', fields })(Page)
)

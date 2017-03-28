import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import AuthSelectors from '~client/account/redux/selectors'
import { asyncUpdateUser } from '~client/account/redux/action-creators'
import Page from './page'

const fields = ['id', 'avatar', 'first_name', 'last_name', 'email']

const mapStateToProps = (state, props) => {
  const user = AuthSelectors(state, props).getUser()
  return {
    initialValues: {
      ...user,
      avatar: user.avatar_url
    }
  }
}

const mapActionsToProps = {
  submit: asyncUpdateUser
}

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'editUserForm', fields })(Page)
)

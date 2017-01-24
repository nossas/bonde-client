import { connect } from 'react-redux'

import { actions as authActions } from '../../authenticate/redux'
import Login from './login'

export default connect(undefined, { login: authActions.login })(Login)

import { connect } from 'react-redux'

import { login } from '../redux/action-creators/login'
import Login from './login'

export default connect(undefined, { login })(Login)

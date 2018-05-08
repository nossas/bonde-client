import { connect } from '../redux'
import PrivateRoute from './components/PrivateRoute'
import AuthAPI from './api'

const mapStateToProps = (state, { redirectTo, ...ownProps }) => ({
  redirectTo: redirectTo || '/auth/login',
  authenticated: AuthAPI.isAuthenticated()
})

/**
 * A PrivateRoute connected with AuthAPI to discovery
 * when user is authenticated.
 *
 */
export default connect(mapStateToProps)(PrivateRoute)

import { connect } from '../redux'
import PrivateRoute from './components/PrivateRoute'
import AuthAPI from './api'


const mapStateToProps = (state, { redirectTo, ...ownProps }) => ({
  redirectTo: redirectTo || '/auth/login',
  authenticated: AuthAPI.isAuthenticated()
})

export default connect(mapStateToProps)(PrivateRoute)

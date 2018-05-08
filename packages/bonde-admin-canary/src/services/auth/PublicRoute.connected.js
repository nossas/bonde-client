import { connect } from '../redux'
import PublicRoute from './components/PublicRoute'
import AuthAPI from './api'

const mapStateToProps = () => ({
  authenticated: AuthAPI.isAuthenticated()
})

/**
 * A PublicRoute connected with AuthAPI to discovery
 * when user is authenticated.
 *
 */
export default connect(mapStateToProps)(PublicRoute)

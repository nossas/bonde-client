import { connect } from 'services/redux'
import Route from './Route'
import authSession from '../session'

const mapStateToProps = (_, { redirectTo }) => ({
  redirectTo: redirectTo || '/auth/login',
  assert: authSession.isAuthenticated()
})

/**
 * A PrivateRoute connected with AuthAPI to discovery
 * when user is authenticated.
 *
 * Component representing a Route, used to render component
 * only when authenticated.
 *
 * @param {boolean} [authenticated=false] - When false user is redirected.
 * @param {string} redirectTo - Redirect used when authenticated is false.
 * @param {function} component - Component  used on render when authenticated
 * is true.
 *
 */
export default connect(mapStateToProps)(Route)

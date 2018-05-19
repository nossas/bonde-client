import { connect } from '../../redux'
import Route from './Route'
import AuthAPI from '../api'

const mapStateToProps = (state, { redirectTo, ...ownProps }) => ({
  redirectTo: redirectTo || '/auth/login',
  assert: AuthAPI.isAuthenticated()
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

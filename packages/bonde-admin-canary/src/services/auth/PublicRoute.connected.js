import { connect } from '../redux'
import PublicRoute from './components/PublicRoute'
import AuthAPI from './api'

const mapStateToProps = () => ({
  authenticated: AuthAPI.isAuthenticated()
})

export default connect(mapStateToProps)(PublicRoute)

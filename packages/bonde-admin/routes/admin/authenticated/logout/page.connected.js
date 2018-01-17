//
// @route /logout
//
import { connect } from 'react-redux'
import { logout } from '~client/account/redux/action-creators'
import Page from './page'

export default connect(undefined, { logout })(Page)

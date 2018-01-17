import { connect } from 'react-redux'

import Sidebar from './sidebar'
import mapStateToProps from './map-state-to-props'

export default connect(mapStateToProps)(Sidebar)

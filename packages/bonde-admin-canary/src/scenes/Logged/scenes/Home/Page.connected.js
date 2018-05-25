import { connect } from '../../../../services/redux'
import Page from './Page'

const mapStateToProps = (state) => ({ name: state.home })

export default connect(mapStateToProps)(Page)

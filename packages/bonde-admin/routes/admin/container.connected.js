import { connect } from 'react-redux'
import AwaitSelectors from '~client/components/await/redux/selectors'
import Container from './container'

const mapStateToProps = state => ({
  loading: AwaitSelectors(state).getLoading()
})

export default connect(mapStateToProps)(Container)

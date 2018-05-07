import { connect } from '../../services/redux'
import Page from './Page'

const mapStateToProps = (state) => ({ name: state.home })

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeName: (evt) => {
    dispatch({ type: 'home/CHANGE_NAME', payload: evt.target.value })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)

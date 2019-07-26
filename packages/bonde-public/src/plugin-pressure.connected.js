import { connect } from 'react-redux'
import { PressurePlugin } from 'bonde-webpage/lib/plugins/pressure'
import { fillWidget } from 'bonde-webpage/lib/plugins/pressure/redux/action-creators'
import { selectors as MobSelectors } from 'bonde-webpage/lib/redux'

const mapDispatchToProps = { fillWidget }

const mapStateToProps = state => {
  const query = MobSelectors(state)
  console.log('query', query)
  return query.getMobilizationLink()
}

export default connect(undefined, mapDispatchToProps)(PressurePlugin)
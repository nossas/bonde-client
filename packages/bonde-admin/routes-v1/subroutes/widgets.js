import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

// Components
import { Loading } from '~client/components/await'

// Redux
import { selectWidget } from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'

// Pages
import Donation from '~root/routes-v1/subroutes/widgets-donation'
import Form from '~root/routes-v1/subroutes/widgets-form'
import Pressure from '~root/routes-v1/subroutes/widgets-pressure'

const stateToProps = state => ({
  widget: MobSelectors(state).getWidget()
})

const actionsToProps = {
  select: selectWidget
}

export default connect(stateToProps, actionsToProps)(class extends React.Component {
  componentDidMount () {
    const {
      widget,
      select,
      match: { params: { widget_id: id } }
    } = this.props

    if (!widget && id) {
      return Promise.all([select(id)])
    }
  }

  render () {
    const { match: { path }, widget } = this.props

    return !widget ? <Loading /> : (
      <React.Fragment>
        <Route path={`${path}/donation`} component={Donation} />
        <Route path={`${path}/form`} component={Form} />
        <Route path={`${path}/pressure`} component={Pressure} />
      </React.Fragment>
    )
  }
})

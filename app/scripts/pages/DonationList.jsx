import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
// import classnames from 'classnames'
import * as Paths from '../Paths'
// import * as MobilizationActions from './../actions/MobilizationActions'
import { TabMenuItem, CloseButton } from '../components'

export default class DonationList extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  renderMenu() {
    const { mobilization, location } = this.props
    const donationsListPath = Paths.donationListMobilization(mobilization.id)

    return (
      <div className="bg-white px3 clearfix">
        <h2 className="mb3"> <i className="fa fa-dollar mr2 aqua" /> Doações</h2>
        <div>
          <ul className="list-reset mb0">
            <TabMenuItem
              path={donationsListPath}
              text="faça sua parte"
              isActive={donationsListPath === location.pathname}
            />
          </ul>
        </div>
      </div>
    )
  }

  renderForm() {
    // const {} = this.props

    return (
      <p>tabela lista doações</p>
    )
  }

  render() {
    const { mobilization } = this.props
    return (
      <div className="flex-auto bg-silver gray relative">
        { this.renderMenu() }
        <div className="py3 px4">
          { this.renderForm() }
        </div>
        <CloseButton path={Paths.editMobilization(mobilization.id)} />
      </div>
    )
  }
}

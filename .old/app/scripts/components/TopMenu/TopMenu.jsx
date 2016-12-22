import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { DropDownMenu, DropDownMenuItem } from './../'
import * as Paths from '../../Paths'

export default class TopMenu extends React.Component {
  static propTypes = {
    auth: PropTypes.object
  }

  renderUserMenu() {
    const { user } = this.props.auth
    if (user) {
      return (
        <div className="clearfix">
          <DropDownMenu
            wrapperClassName='ml1'
            menuClassName='right-0 bg-topMenu mt2 rounded'
            buttonClassName='bg-topMenu white btn'
            icon="user">
            <DropDownMenuItem
              className='block button button-transparent white p1'
              href={Paths.newMobilization()}>
              <i className="fa fa-plus center inline-block" style={{width: '30px'}}/>
              Nova mobilização
            </DropDownMenuItem>
            <DropDownMenuItem
              className='block button button-transparent white p1'
              href={Paths.mobilizations()}>
              <i className="fa fa-flag-o center inline-block" style={{width: '30px'}}/>
              Suas mobilizações
            </DropDownMenuItem>
            <DropDownMenuItem
              className='block button button-transparent white p1'
              href={Paths.logout()}>
              <i className="fa fa-sign-out center inline-block" style={{width: '30px'}}/>
              Sair
            </DropDownMenuItem>
          </DropDownMenu>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="topMenu clearfix flex flex-none px4 bg-topMenu">
        <Link
          to="/"
          className="reboo-logo mt1">
        </Link>
        <i className="fa fa-ellipsis-v py2 lightGray"></i>
        { this.renderUserMenu() }
      </div>
    )
  }
}

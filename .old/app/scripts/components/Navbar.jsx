import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { DropDownMenu, NavbarEditionWrapper } from './'

export default class Navbar extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    auth: PropTypes.object,
    editable: PropTypes.bool
  }

  renderNavbarButtons(mobile) {
    const { blocks, mobilization, editable } = this.props
    const { header_font: headerFont, body_font: bodyFont } = mobilization

    const className = classnames(
      'btn btn-transparent block white p2',
      `${headerFont}-header`,
      `${bodyFont}-body`
    )

    const visibleBlocks = blocks.data.filter((b) => {
      return editable ? !b.hidden : !b.hidden && !b.menu_hidden
    })

    return (
      visibleBlocks.map((block, i) => {
        return (
          <div key={i} className={classnames({'inline-block': !mobile})}>
            <NavbarEditionWrapper
              {...this.props}
              key={`navbar-edition-wrapper-${block.id}`}
              block={block}
              className={className}
            />
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div className="absolute col-12 z3">
        <div className="lg-show center">
          <div className="bg-darken-4">
            {this.renderNavbarButtons(false)}
          </div>
        </div>
        <div className="lg-hide">
          <DropDownMenu
            wrapperClassName='absolute right-0 top-0 m1'
            buttonClassName='btn bg-darken-4 white rounded'
            menuClassName="rounded bg-darken-4 white top-0 right-0"
            menuStyle={{ marginTop: '40px' }}
            icon="bars">
            {this.renderNavbarButtons(true)}
          </DropDownMenu>
        </div>
      </div>
    )
  }
}

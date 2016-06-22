import React, { PropTypes } from 'react'


class Color extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.context = context
  }

  handleClick() {
    const { dirty, path } = this.props
    if (!dirty || (dirty && window.confirm("Ao sair sem salvar você perderá suas modificações. Deseja sair sem salvar?"))) {
      if (path) {
        this.context.router.transitionTo(path)
      } else {
        this.context.router.goBack()
      }
    }
  }

  render(){
    return(
      <div className="absolute right-0 top-0 muted h2 p2">
        <button className="button button-transparent" onClick={::this.handleClick}>
          <i className="fa fa-close" />
        </button>
      </div>
    )
  }
}

Color.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default Color

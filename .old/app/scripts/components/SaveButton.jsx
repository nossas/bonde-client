import React, { PropTypes } from 'react'

export default class SaveButton extends React.Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    saved: PropTypes.bool
  }

  render() {
    const { saving, saved, handleClick } = this.props

    if (saving) {
      return (
        <button className="button bg-aqua h3 mr1" disabled>
          <i className="fa fa-spin fa-refresh mr1" />
          Salvando...
        </button>
      )
    } else if (saved) {
      return (
        <button className="button bg-aqua h3 mr1" disabled>
          <i className="fa fa-check mr1" />
          Salvo
        </button>
      )
    }
    return (
      <button className="button bg-aqua h3 mr1" onClick={handleClick}>
        Salvar
      </button>
    )
  }
}

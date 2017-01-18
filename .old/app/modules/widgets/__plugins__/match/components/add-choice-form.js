import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class AddChoiceForm extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  handleUpdateChoices(e) {
    if (e) e.preventDefault()

    const { choices, updateChoices } = this.props
    if (this.state.value.length > 0 && choices.indexOf(this.state.value) === -1) {
      updateChoices([...choices, this.state.value])
    }
    this.setState({ value: '' })
  }

  onAddItem(e) {
    if (e) e.preventDefault()

    const { choices, handleAddItem } = this.props
    const { value } = this.state

    this.setState({ value: '' })  // clean input
    if (!choices.includes(value)) {
      handleAddItem(value)
    }
  }

  render() {
    const {
      title,
      choices,
      label,
      handleChangeLabel,
      handleRemoveItem,
      tabindexTitle,
      tabindex,
      className
    } = this.props
    return (
      <div className={classnames('sm-col sm-col-6', className)}>
        <div className="sm-col sm-col-12">
          <label className="darkengray">{title}</label>
          <input
            type="text"
            placeholder="Label"
            value={label}
            className="input block h3 col-12 mt1 mb3 h5"
            onChange={e => { handleChangeLabel(e.target.value) }}
            tabIndex={tabindexTitle}
          />
        </div>
        <div className="sm-col sm-col-10 pr2">
          <input
            value={this.state.value}
            onChange={e => { this.setState({ value: e.target.value }) }}
            type="text"
            className="input block h3 col-12 mt1 mb3 h5"
            placeholder="Escolha"
            onKeyPress={e => e.key === 'Enter' ? this.onAddItem(e) : null}
            tabIndex={tabindex}
          />
        </div>
        <div className="sm-col sm-col-2 right-align">
          <button
            className="btn caps py2 px1 rounded h5 bg-pagenta white"
            disabled={!this.state.value.length}
            style={{ marginTop: '8px' }}
            onClick={::this.onAddItem}
          >
            Adicionar
          </button>
        </div>
        <div className="choices-block sm-col sm-col-12">
          {
            choices.map((choice, index) => (
              <div className="col-12 clearfix" key={index}>
                <div className="col col-10 darkengray">{choice}</div>
                <div className="col col-2 link center">
                  <a
                    href="#"
                    className="h6 caps"
                    onClick={e => { if (e) { e.preventDefault() } handleRemoveItem(choice) }}
                  >
                    Remover
                  </a>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

AddChoiceForm.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  choices: PropTypes.array.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  tabindexTitle: PropTypes.string,
  tabindex: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

AddChoiceForm.defaultProps = {
  choices: [],
}

export default AddChoiceForm

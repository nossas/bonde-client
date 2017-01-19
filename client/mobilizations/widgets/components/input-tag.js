import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { BlockTag } from '../components'

class InputTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: undefined,
      value: ''
    }
  }

  handleKeyPress(event) {
    // [Enter] should not submit the form when choosing an address.
    if (event.charCode === 13) {
      event.preventDefault()
      const { values, onInsertTag, validate, name } = this.props
      const value = event.target.value
      const errors = validate && validate(value)

      if (errors && !errors.valid) {
        this.setState({ error: errors.message })
      } else {
        onInsertTag && onInsertTag(value)
        this.setState({ value: '', error: undefined })
      }
    }
  }

  handleEdit(value) {
    const { onRemoveTag } = this.props
    onRemoveTag && onRemoveTag(value)
    this.setState({ value: value, error: undefined })
  }

  render() {
    const { values, label, onRemoveTag } = this.props

    return (
      <div className='input-tag'>
        {
          label &&
          <label
            style={{ cursor: 'pointer' }}
            className='h5 bold caps'
            htmlFor='insert-tag-id'
          >
            {label}
            {(this.state.error && <span className='red'> - {this.state.error}</span>)}
          </label>
        }
        <input
          ref='insert'
          id='insert-tag-id'
          type='text'
          className='input block h3 col-12 mt1 px1'
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyPress={::this.handleKeyPress}
        />
        <BlockTag
          tags={values}
          onClick={::this.handleEdit}
          onRemove={onRemoveTag}
        />
        <span className='h5'>
          {'Pressione <Enter> para adicionar mais alvos.'}
        </span>
        <p className='h5 mt1'>
          *** Ao adicionar um novo alvo, é necessário alterar um dos outros dois campos
          abaixo para salvar.
        </p>
      </div>
    )
  }
}

InputTag.propTypes = {
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  validate: PropTypes.func,
  onInsertTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
}

export default InputTag

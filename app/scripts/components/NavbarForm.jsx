import React, { PropTypes } from 'react'
import { editBlock } from './../reducers/blocks'

export default class NavbarForm extends React.Component {
  static propTypes = {
    handleCloseForm: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    defaultValue: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      name: props.defaultValue
    }
  }

  componentDidMount() {
    this.refs.nameInput.focus()
    this.refs.nameInput.select()
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 27) {
      this.submit(e)
    }
  }

  handleChangeName(e) {
    this.setState({name: e.target.value})
  }

  submit(e) {
    e.preventDefault()
    const { mobilization, block, dispatch, auth } = this.props

    dispatch(
      editBlock({
        mobilization_id: mobilization.id,
        id: block.id,
        block: {name: this.state.name},
        credentials: auth.credentials
      })
    )

    this.props.handleCloseForm()
  }

  render() {
    return (
      <form className='inline-block' onSubmit={::this.submit}>
        <input
          type='text'
          ref='nameInput'
          className='field-light z2 relative'
          value={this.state.name}
          onChange={::this.handleChangeName}
        />
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z1"
          onClick={::this.submit}/>
      </form>
    )
  }
}

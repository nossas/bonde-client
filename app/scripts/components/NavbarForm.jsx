import React, { PropTypes } from 'react'


export default class NavbarForm extends React.Component {
  static propTypes = {
    handleCloseForm: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired,
    blockUpdate: PropTypes.func.isRequired,
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
    const { mobilization, block, blockUpdate } = this.props

    blockUpdate({
      mobilization,
      block: { ...block, name: this.state.name },
    })
    
    this.props.handleCloseForm()
  }

  render() {
    return (
      <form className="inline-block" onSubmit={::this.submit}>
        <input
          type="text"
          ref="nameInput"
          className="input z2 relative"
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

import React, {PropTypes} from 'react'

export default class Label extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    htmlFor: PropTypes.string
  }

  render() {
    const {htmlFor, children} = this.props

    return (
      <label
        style={{cursor: 'pointer'}}
        className="h5 bold caps"
        htmlFor={htmlFor}>
        {children}
      </label>
    )
  }
}

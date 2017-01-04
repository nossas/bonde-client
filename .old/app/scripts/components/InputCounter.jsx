import React, {PropTypes} from 'react'
import classnames from 'classnames'

export default class InputCounter extends React.Component {
  static propTypes = {
    maxLength: PropTypes.number.isRequired,
    length: PropTypes.number,
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  }

  render() {
    const {maxLength, length, className} = this.props
    const dif = maxLength - length

    return (
      <span className={classnames(className, {red: dif < 11})}>{ dif }</span>
    )
  }
}

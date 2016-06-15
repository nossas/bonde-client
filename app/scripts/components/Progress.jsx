import React, {PropTypes} from 'react'
import classnames from 'classnames'

export default class Progress extends React.Component {
  static propTypes = {
    percent: PropTypes.number.isRequired,
    className: PropTypes.string
  }

  render() {
    return (
      <div className={classnames('full-width', 'border')} >
        <div
          ref='progress'
          className={this.props.className}
          style={{width: `${this.props.percent}%`}} >
          <br />
        </div>
      </div>
    )
  }
}

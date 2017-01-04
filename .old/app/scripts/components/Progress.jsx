import React, {PropTypes} from 'react'
import classnames from 'classnames'

export default class Progress extends React.Component {
  static propTypes = {
    percent: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  }

  render() {
    return (
      <div className={classnames('col-12 border rounded border-darken-4')} >
        <div
          ref='progress'
          className={this.props.className}
          style={{ ...this.props.style, width: `${this.props.percent}%` }} >
          <br />
        </div>
      </div>
    )
  }
}

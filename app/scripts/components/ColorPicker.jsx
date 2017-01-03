import React from 'react'
import Color from './Color.jsx'

export default class ColorPicker extends React.Component {
  renderColors (bgClasses) {
    return bgClasses.map(function (bgClass) {
      return (
        <Color
          {...this.props}
          key={`color-${bgClass}`}
          bgClass={bgClass}
          selectedClass={this.props.selectedClass}
          onClick={this.props.onClick}
        />
      )
    }.bind(this))
  }

  render () {
    const ourcities = ['nossascidades', 'nuestrasciudades', 'ourcities']
    const networkClasses = ['bg-9',
      'bg-10', 'bg-11', 'bg-12', 'bg-13', 'bg-14', 'bg-15', 'bg-16', 'bg-17', 'bg-18', 'bg-19',
      'bg-20', 'bg-21', 'bg-22', 'bg-23', 'bg-24', 'bg-25', 'bg-26', 'bg-27', 'bg-28', 'bg-29',
      'bg-30', 'bg-31', 'bg-32', 'bg-33', 'bg-34', 'bg-35', 'bg-36', 'bg-37', 'bg-38', 'bg-39',
      'bg-40'
    ]
    let bgClasses = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6', 'bg-7', 'bg-8']

    if (ourcities.indexOf(this.props.colorScheme) !== -1) {
      bgClasses.push.apply(bgClasses, networkClasses)
    }

    return (
      <div>
        {this.renderColors(bgClasses)}
      </div>
    )
  }
}

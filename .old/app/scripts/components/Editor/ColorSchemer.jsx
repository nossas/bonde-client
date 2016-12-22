import React from 'react'
import ColorsPicker from 'react-colors-picker'
import { Panel as ColorPickerPanel } from 'react-colors-picker'

export default class ColorSchemer extends React.Component {
  handleChange(colors){
    if(typeof(this.props.onChange) === 'function') {
      this.props.onChange(colors.color)
    }
  }

  render(){
    return(
      <ColorPickerPanel mode="RGB" onChange={ ::this.handleChange } />
    )
  }
}

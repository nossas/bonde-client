import React from 'react'
import { Panel as ColorPickerPanel } from 'react-colors-picker'

const ColorSchemer = ({ onChange }) => (
  <ColorPickerPanel
    mode='RGB'
    onChange={colors => {
      typeof this.props.onChange === 'function' && onChange(colors.color)
    }}
  />
)

export default ColorSchemer

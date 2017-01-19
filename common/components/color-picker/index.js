import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'

import themes from './themes'
import * as ColorPickerActions from './actions'

export const ColorPicker = ({
  dispatch,
  className,
  theme,
  showColorPicker,
  onChangeColor,
  selectedColor,
  color,
  // Actions
  setSelectedColor
}) => {
  const hasTheme = theme && themes[theme]
  const defaultAction = color => dispatch(setSelectedColor(color.rgb))
  const colorStrategy = selectedColor ? selectedColor : (hasTheme ? themes[theme][0] : '#333')

  return !showColorPicker ? null : (
    <div className={classnames('color-picker-container', className)}>
      <SketchPicker
        color={color || colorStrategy}
        onChangeComplete={onChangeColor || defaultAction}
        presetColors={hasTheme ? themes[theme] : []}
      />
    </div>
  )
}

ColorPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showColorPicker: PropTypes.bool.isRequired,
  onChangeColor: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  theme: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

ColorPicker.defaultProps = {
  showColorPicker: true
}

const mapStateToProps = state => ({
  selectedColor: state.colorPicker.color || '#333'
})

export default connect(mapStateToProps, ColorPickerActions)(ColorPicker)

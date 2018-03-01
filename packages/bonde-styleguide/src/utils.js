import PropTypes from 'prop-types'

export const px = 
  (value, defaultValue) => (value || defaultValue) ? `${value || defaultValue}px` : 0;

export const borderSpacing = (
  propName = 'margin',
  { top, right, bottom, left, x, y }
) => `
  ${propName}-top: ${px(top, y)};
  ${propName}-bottom: ${px(bottom, y)};
  ${propName}-left: ${px(left, x)};
  ${propName}-right: ${px(right, x)};
`

export const borderSpacingPropTypes = {
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
}

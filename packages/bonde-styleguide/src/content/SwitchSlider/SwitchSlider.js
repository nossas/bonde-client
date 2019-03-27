import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 36px;
  padding-left: 36px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 13px;
    left: -3px;
    right: 10px;
    bottom: 8px;
    background-color: #444444;
    -webkit-transition: .4s;
    transition: .4s;
    ${props => props.round && `border-radius: 34px;`};

    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 0;
      bottom: 0;
      background-color: white;
      -webkit-transition: .4s;
      -webkit-transition: .4s;
      transition: .4s;
      box-shadow: 0 0 3px 0px;
      ${props => props.round && `border-radius: 50%;`};
    }
  }

  input:checked + .slider {
    background-color: #6ee8bf;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    left: -12px;
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  p {
    margin-top: -9px;
    color: ${props => props.checked ? '#6ee8bf' : '#444444'};
    ;
  }
`

const SwitchSlider = ({ children, round, checked, onChange }) => {
  const inputProps = { onChange }
  if (checked !== undefined) {
    inputProps.checked = checked
  }
  return (
    <Switch round={round} checked={checked}>
      <input type="checkbox" {...inputProps} />
      <span className="slider" />
      {children}
    </Switch>
  )
}

SwitchSlider.propTypes = {
  /** Control checkbox marking */
  checked: PropTypes.bool,
  /** Function called when toggle slider */
  onChange: PropTypes.func,
  /** Change rectangular to rounded */
  round: PropTypes.bool
}

SwitchSlider.defaultProps = {
  round: false,
  onChange: () => {}
}

/* @component */
export default SwitchSlider
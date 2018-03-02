import React from 'react'
import Checkbox from '../Checkbox/Checkbox'

const Radio = Checkbox.withComponent(
  ({ children, className, ...inputProps }) => (
    <label className={className}>
      <input type='radio' {...inputProps} />
      <span>{children}</span>
      <div className='box' />
    </label>
  )
).extend`
& .box {
  position: absolute;
  top: 2px;
  left: 2px;
  height: 19px;
  width: 19px;
  background: #fff;
  border: 1px solid #4a4a4a;
  border-radius: 9.5px;
}
&:hover input:not([disabled]):checked ~ .box,
& input:checked:focus ~ .box {
  background: #fff;
  border-color: #ff0099;
}
& input:checked ~ .box {
  background: #fff;
  border-color: #ff0099;
}
& .box:after {
  left: 2px;
  top: 2px;
  bottom: 2px;
  right: 2px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ff0099;
}
& input:disabled:checked ~ .box {
  background: #fff;
  border-color: #d1cdd2;
}
& input:disabled:checked ~ .box:after {
  display: block;
  background: #d1cdd2;
}`

/* @component */
export default Radio

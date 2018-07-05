import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`

const Content = styled.span`
  display: inline-block;
  font-family: Nunito Sans;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0.5px;
  text-align: center;
  color: #000000;
  text-transform: uppercase;
  border-radius: 100px;
  border: solid 1px #000000;
  cursor: pointer;
  padding: 15px 25px;
  margin: 0 5px 5px 0;

  transition: .2s;

  ${Checkbox}:checked + & {
    border: solid 1px #ee0099;
    color: #ee0099;
  }
`

const Tag = ({ label, ...field }) => (
  <label>
    <Checkbox {...field} />
    <Content>
      {label}
    </Content>
  </label>
)

const { oneOfType, node, func, bool, string } = PropTypes

Tag.propTypes = {
  /** Anything that can be rendered, will be rendered inside the tag. */
  label: oneOfType([node, func]).isRequired,
  /** The default checked state. */
  defaultChecked: bool,
  /** The form input name attribute. */
  name: string,
  /** The form input value attribute. */
  value: oneOfType([bool, string]),
}

Tag.defaultProps = {
  defaultChecked: false
}

Tag.displayName = 'Tag'

export default Tag

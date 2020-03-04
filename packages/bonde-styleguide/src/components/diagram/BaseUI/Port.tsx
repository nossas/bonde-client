import styled, { css } from 'styled-components'

// TODO: Use types of lib
export const PortDynamicStyle = (props)  => css`
  background: #ee0090;
  border-radius: 50px;
  width: 16px;
  height: 16px;
  position: absolute;
  top: calc(50% - 8px);

  &:hover {
    background: none;
    border: 1px solid #ee0090;
  }

  ${props.node.getOptions().in ? 'left: -8px;' : 'right: -8px;'}
`

const Port = styled.div`
  ${PortDynamicStyle}
`

export default Port
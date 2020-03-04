import styled from 'styled-components'
import { PortDynamicStyle } from '../BaseUI/Port'

const ActionPort = styled.div`
  padding: 0 10px 0;
  position: relative;
  text-align: right;
  margin-bottom: 10px;

  .port {
    ${PortDynamicStyle}
    background-color: ${props => props.node.getOptions().success ? 'green' : 'red'};
  }
`

export default ActionPort
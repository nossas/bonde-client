import styled from 'styled-components'
import { PortDynamicStyle } from '../BaseUI/Port'

const QuickReply = styled.div`
	position: relative;
	width: auto;
  color: #1e88e5;
  padding: 10px 24px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #1e88e5;
  border-radius: 50px;
  margin-bottom: 5px;

	.port {
		${PortDynamicStyle}
	}
`

export default QuickReply
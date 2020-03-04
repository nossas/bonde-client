import styled from 'styled-components'

const TableCell = styled.div`{
  display: table-cell;
  padding: 13px 15px 14px 15px;
  vertical-align: middle;
  text-align: inherit;

  ${props => props.width && `width: ${props.width};`}
}`

TableCell.displayName = 'TableCell'

/** @component */
export default TableCell

import styled from 'styled-components'

const TableRow = styled.div`{
  display: table-row;
  border-bottom: ${props => props.border ? '1px solid #c7c7c726' : 'none'};

  ${props => props.onClick && `
    &:hover {
      background-color: #c7c7c71f;
      cursor: pointer;
    }
  `}

}`

TableRow.displayName = 'TableRow'

/** @component */
export default TableRow

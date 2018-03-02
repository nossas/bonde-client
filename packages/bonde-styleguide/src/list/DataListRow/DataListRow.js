import styled from 'styled-components'

/**
 * The row component of `DataList`.
 */
const DataListRow = styled.div`{
  display: table-row;
  border-bottom: 1px solid #efefef;

  &:last-child {
    border: none;
  }
}`

/* @component */
export default DataListRow

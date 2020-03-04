import React from 'react'
import styled from 'styled-components'
import TableCell from './TableCell'
import TableRow from './TableRow'

const TableHeaderCell = styled((props) => <TableCell {...props} />)`
  opacity: 0.53;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #222222;
  text-transform: uppercase;
  padding: 0 15px;
`

const TableHeader = styled(({ className, children, columns }) => (
  <div className={className}>
    {columns && (
      <TableRow border>
        {columns.map(col => (
          <TableHeaderCell key={Math.random()}>
            {col.header || ''}
          </TableHeaderCell>
        ))}
      </TableRow>
    )}
    {children}
  </div>
))`{
  display: table-header-group;
}`

TableHeader.displayName = 'TableHeader'

/** @component */
export default TableHeader

import React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Card from './Card'

export const DataListCol = styled.div`{
  display: table-cell;
  padding: 13px 15px 14px 15px;

  &:first-child {
    padding-left: 26px;
  }
  &:last-child {
    padding-right: 26px;
  }

  ${props => props.align === 'left' && `
    display: flex;
    justify-content: flex-end;
  `}
}`

DataListCol.displayName = 'DataListCol'

export const DataListRow = styled.div`{
  display: table-row;
  border-bottom: 1px solid #efefef;

  &:last-child {
    border: none;
  }
}`

DataListRow.displayName = 'DataListRow'

const DataListTable = styled.div`{
  display: table;
  border-collapse: collapse;
  width: 100%;
  margin-top: -17px;
}`

const LinkShowAll = Text.withComponent('a').extend`
  font-size: 11px !important;
  font-weight: 800 !important;
  line-height: 1.36 !important;
  text-transform: uppercase;
  cursor: pointer;
  display: block;
  text-align: right !important;
  margin: 9px 26px 0;
`

const DataList = ({ children, moreAction, moreText, ...props }) => (
  <Card paddingY='17px' paddingX='0px' {...props}>
    <DataListTable>
      {children}
    </DataListTable>
    {moreAction && moreText && (
      <LinkShowAll onClick={moreAction}>{moreText}</LinkShowAll>
    )}
  </Card>
)

DataList.displayName = 'DataList'

export default DataList

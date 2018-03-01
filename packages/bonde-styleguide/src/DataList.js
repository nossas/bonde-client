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

export const DataListTable = styled.div`{
  display: table;
  border-collapse: ${props => props.border ? 'collapse' : 'unset'};
  width: 100%;
}`

DataListTable.displayName = 'DataListTable'

DataListTable.defaultProps = {
  border: false
}

export const LinkShowAll = Text.withComponent('a').extend`
  font-size: 11px !important;
  font-weight: 800 !important;
  line-height: 1.36 !important;
  text-transform: uppercase;
  cursor: pointer;
  display: block;
`

LinkShowAll.displayName = 'LinkShowAll'

import React from 'react';
import styled from 'styled-components';
import {
  useTable,
  // useResizeColumns,
  useFlexLayout
  // useRowSelect,
} from 'react-table';

type StylesProps = {
  height?: string
}

export const Styles = styled.div<StylesProps>`
  width: 100%;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 10px 20px -7px rgba(0,0,0,0.05);
  padding: 0 0 20px;

  display: block;
  overflow: auto;

  .table {
    border-spacing: 0;

    .thead {
      overflow-y: auto;
      overflow-x: hidden;

      .th {
        padding: 5px 5px;
      }
    }

    .th {
      flex: none !important;

      h5 {
        text-transform: uppercase;
      }
    }

    .tbody {
      overflow-y: scroll;
      overflow-x: hidden;
      ${props => props.height && `height: ${props.height}`};

      .td {
        flex: none !important;
        margin: 0 !important;
      }

      .th, .td {
        padding: 0.7rem;
        margin: auto;
        background-color: #fff;
      }

      &::-webkit-scrollbar {
        width: 33px;
      }
      &::-webkit-scrollbar-thumb {
        background-clip: padding-box;
        background-color: rgba(74, 74, 74, 0.75);
        border-width: 20px 15px;
        border-style: solid;
        border-color: transparent;
        border-image: initial;
      }

      .tr {
        border-bottom: 1px solid #c7c7c74a;
      }
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid #c7c7c7;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.7rem;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      .resizer {
        right: 0;
        background: #c7c7c7;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${''}
        touch-action :none;

        &.isResizing {
          background: #c7c7c757;
        }
      }
    }
  }
`;

const headerProps = (props: any, { column }: any) => getStyles(props, column.align);

const cellProps = (props: any, { cell }: any) => getStyles(props, cell.column.align);

const getStyles = (props: any, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex'
    }
  }
];

type Props = {
  columns: any[]
  data: any[]
}

function Table({ columns, data }: Props) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useFlexLayout,
    (hooks: any) => {
      hooks.allColumns.push((columns: any) => [...columns])
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }: any) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0].headers[0];
        selectionGroupHeader.canResize = false;
      })
    }
  );

  const tableProps: any = getTableProps();

  return (
    <div {...tableProps} className="table">
      <div>
        {headerGroups.map((headerGroup: any, headerIndex: number) => (
          <div
            key={`header-${headerIndex}`}
            {...headerGroup.getHeaderGroupProps({
              // style: { paddingRight: '15px' },
            })}
            className="tr"
          >
            {headerGroup.headers.map((column: any, columnIndex: number) => (
              <div key={`column-${headerIndex}${columnIndex}`} {...column.getHeaderProps(headerProps)} className="th">
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="tbody">
        {rows.map((row: any, rowIndex: number) => {
          prepareRow(row);
          return (
            <div key={`row-${rowIndex}`} {...row.getRowProps()} className="tr">
              {row.cells.map((cell: any, cellIndex: number) => {
                return (
                  <div key={`cell-${rowIndex}${cellIndex}`} {...cell.getCellProps(cellProps)} className="td">
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;

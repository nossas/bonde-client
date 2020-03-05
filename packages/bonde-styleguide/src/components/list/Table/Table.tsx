import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { Scrollbox } from '../../..';

const Table = styled.div`
   {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }
`;

Table.displayName = 'Table';

const TableBody = styled.div`
   {
    display: table-row-group;
  }
`;

TableBody.displayName = 'TableBody';

const ReactTable = ({
  data,
  columns,
  border,
  margin,
  borderBottom,
  ColumnComponent,
  HeaderComponent,
  EmptyComponent,
  // FooterComponent,
  onClickRow,
}) => {
  const empty = data.length === 0;

  return !empty ? (
    <Scrollbox margin={margin} borderBottom={borderBottom}>
      <Table>
        {HeaderComponent && <HeaderComponent columns={columns} />}
        <TableBody>
          {data.map(row => (
            <TableRow
              border={border}
              key={Math.random()}
              onClick={onClickRow ? () => onClickRow(row) : undefined}
            >
              {columns.map(col => (
                <ColumnComponent key={Math.random()} {...col.props}>
                  {col.render
                    ? col.render({ value: row[col.field], row })
                    : row[col.field]}
                </ColumnComponent>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbox>
  ) : (
    <EmptyComponent />
  );
};

ReactTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  /* A function that receive data row */
  onClickRow: PropTypes.func,
  ColumnComponent: PropTypes.any,
  EmptyComponent: PropTypes.any,
  HeaderComponent: PropTypes.any,
};

ReactTable.defaultProps = {
  border: false,
  data: [],
  ColumnComponent: TableCell,
};

ReactTable.displayName = 'Table';

/** @component */
export default ReactTable;

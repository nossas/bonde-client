import React from 'react';
import PropTypes from 'prop-types';
import { DataList, DataListRow, DataListCol, Text, Scrollbox } from '../../..';

const CustomCol = ({ render, value, row, label, ...colProps }) => (
  <DataListCol {...colProps}>
    {typeof render === 'function' ? (
      render({ value, row })
    ) : (
      <Text fontSize={14}>{value}</Text>
    )}
  </DataListCol>
);

const DataListCard = ({
  // sectionTitle,
  // height,
  border,
  fields,
  items,
  picker,
  // Footer,
  // footerProps,
}) => {
  const fieldNames = Object.keys(fields);

  return (
    <Scrollbox>
      <DataList border={border}>
        <DataListRow transparent>
          {fieldNames.map(fieldName => {
            const { label, ...colProps } = fields[fieldName];
            return (
              <DataListCol
                {...colProps}
                key={`row-header-${Math.random()}`}
                padding={false}
              >
                <Text>{label}</Text>
              </DataListCol>
            );
          })}
        </DataListRow>
        {items.map(item => (
          <DataListRow key={`row-${Math.random()}`}>
            {fieldNames.map(fieldName => (
              <CustomCol
                {...fields[fieldName]}
                key={`col-${Math.random()}`}
                row={item}
                value={picker ? item[picker][fieldName] : item[fieldName]}
              />
            ))}
          </DataListRow>
        ))}
      </DataList>
    </Scrollbox>
  );
};

const {
  // oneOfType,
  oneOf,
  // string,
  // number,
  // bool,
  object,
  array,
  // node,
  // func,
  // shape
} = PropTypes;

DataListCard.propTypes = {
  border: oneOf(['collapse', 'separate', 'unset']),
  fields: object,
  items: array,
};

DataListCard.defaultProps = {
  border: 'unset',
  fields: {},
  items: [],
};

DataListCard.displayName = 'DataListCard';

/** @component */
export default DataListCard;

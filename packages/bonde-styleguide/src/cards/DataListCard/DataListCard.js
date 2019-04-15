import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  DataList,
  DataListRow,
  DataListCol,
  Text,
  Scrollbox
} from '../../'

const CustomCol = ({ render, field, row, ...colProps }) => (
  <DataListCol {...colProps}>
    {typeof render === 'function' ? render(field, row) : (
      <Text fontSize={14}>{field}</Text>
    )}
  </DataListCol>
)

const DataListCard = ({
  sectionTitle,
  minHeight,
  border,
  fields,
  items,
  picker,
  Footer,
  footerProps,
}) => {
  const fieldNames = Object.keys(fields)

  return (
    <Card
      title={sectionTitle}
      minHeight={minHeight}
      Footer={Footer}
      footerProps={footerProps}
    >
      <Scrollbox>
        <DataList border={border}>
        {items.map(item => (
          <DataListRow key={Math.random()}>
          {fieldNames.map(fieldName => (
            <CustomCol
              {...fields[fieldName]}
              key={Math.random()}
              row={item}
              field={picker ? item[picker][fieldName] : item[fieldName]}
            />
          ))}
          </DataListRow>
        ))}
        </DataList>
      </Scrollbox>
    </Card>
  )
}

const { oneOfType, oneOf, string, number, bool, object, array, node, func, shape } = PropTypes

DataListCard.propTypes = {
  sectionTitle: string,
  minHeight: number,
  border: bool,
  fields: object,
  items: array,
  Footer: oneOfType([node, func]),
  footerProps: shape({
    align: oneOf(['flex-start', 'center', 'flex-end']),
    justify: oneOf(['flex-start', 'center', 'flex-end', 'space-between']),
  }),
  picker: string
}

DataListCard.defaultProps = {
  minHeight: 274,
  border: true,
  fields: {},
  items: []
}

DataListCard.displayName = 'DataListCard'

/* @component */
export default DataListCard

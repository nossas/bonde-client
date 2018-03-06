import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox,
  IconColorful,
  Number
} from '../../'

const NumberCard = ({
  sectionTitle,
  minHeight,
  iconName,
  value,
  alignItems
}) => (
  <Card title={sectionTitle} minHeight={minHeight}>
    <Flexbox row padding={{ y: 14, x: 19 }} alignItems={alignItems}>
      <Number
        value={value}
        icon={iconName && <IconColorful name={iconName} />}
      />
    </Flexbox>
  </Card>
)

NumberCard.propTypes = {
  sectionTitle: PropTypes.string,
  minHeight: PropTypes.number,
  alignItems: PropTypes.oneOf(['start', 'middle', 'end']),
  iconName: PropTypes.string,
  value: PropTypes.number.isRequired
}

NumberCard.defaultProps = {
  alignItems: 'end',
  minHeight: 110
}

/* @component */
export default NumberCard

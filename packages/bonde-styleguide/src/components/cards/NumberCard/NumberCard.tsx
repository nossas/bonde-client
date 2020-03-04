import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '../../cards'
import { Flexbox } from '../../layout'
import { Number } from '../../content'

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
        iconName={iconName}
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

NumberCard.displayName = 'NumberCard'

/** @component */
export default NumberCard

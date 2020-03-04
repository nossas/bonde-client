import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox,
  Text,
  IconColorful
} from '../../..'

const ClickableCard = ({
  sectionTitle,
  minHeight,
  iconName,
  label,
  description,
  onClick
}) => (
  <Card title={sectionTitle} minHeight={minHeight} onClick={onClick} middle>
    <Flexbox horizontal padding={{ x: 18 }}>
      <IconColorful name={iconName} />
      <Flexbox fullSize padding={{ left: 20 }}>
        <Text fontSize={16} fontWeight={900} lineHeight={1.25}>{label}</Text>
        <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>{description}</Text>
      </Flexbox>
    </Flexbox>
  </Card>
)

ClickableCard.propTypes = {
  sectionTitle: PropTypes.string,
  minHeight: PropTypes.number,
  iconName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

ClickableCard.defaultProps = {
  minHeight: 110
}

ClickableCard.displayName = 'ClickableCard'

/** @component */
export default ClickableCard

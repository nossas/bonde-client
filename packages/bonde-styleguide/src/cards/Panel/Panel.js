import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox,
  Image,
  Text,
  Title
} from '../../'

const textColor = '#4a4a4a'

const Panel = ({
  image,
  minHeight,
  sectionTitle,
  author,
  title,
  description
}) => (
  <Card title={sectionTitle} minHeight={minHeight}>
    <Image src={image} height={185} />
    <Flexbox padding={{ x: 16, y: 14 }}>
      <Title.H3>{title}</Title.H3>
      <Text fontSize={16} lineHeight={1.31} color={textColor} margin={{ y: 8 }}>
        {description}
      </Text>
      <Text fontSize={13} lineHeight={1.85} color={textColor}>
        {author}
      </Text>
    </Flexbox>
  </Card>
)

Panel.propTypes = {
  sectionTitle: PropTypes.string,
  minHeight: PropTypes.number,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

Panel.defaultProps = {
  minHeight: 320
}

/* @component */
export default Panel

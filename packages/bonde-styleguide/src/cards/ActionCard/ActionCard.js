import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox,
  IconColorful,
  Title,
  Button
} from '../../'

const ActionCard = ({
  sectionTitle,
  minHeight,
  iconName,
  callToAction,
  btnText,
  btnOnClick,
  btnDisabled
}) => (
  <Card title={sectionTitle} minHeight={minHeight} middle>
    <Flexbox padding={{ x: 82 }} alignItems='middle'>
      {iconName && <IconColorful name={iconName} size={80} />}
      <Title.H3 margin={{ top: 10, bottom: 22 }}>
        {callToAction}
      </Title.H3>
      <Button disabled={btnDisabled} onClick={btnOnClick}>{btnText}</Button>
    </Flexbox>
  </Card>
)

ActionCard.propTypes = {
  sectionTitle: PropTypes.string,
  minHeight: PropTypes.number,
  iconName: PropTypes.string,
  callToAction: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  btnOnClick: PropTypes.func.isRequired,
  btnDisabled: PropTypes.bool
}

ActionCard.defaultProps = {
  minHeight: 274,
  btnDisabled: false
}

export default ActionCard

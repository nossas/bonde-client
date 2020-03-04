import React from 'react'
// import PropTypes from 'prop-types'
import {
  Card,
  Flexbox,
  IconColorful,
  Title,
  Button
} from '../../..'

interface Props {
  sectionTitle?: string;
  minHeight?: string;
  iconName?: string;
  callToAction: string;
  btnText: string;
  btnOnClick?: Function;
  btnDisabled?: boolean;
}

const ActionCard = ({
  sectionTitle,
  minHeight,
  iconName,
  callToAction,
  btnText,
  btnOnClick,
  btnDisabled
}: Props) => (
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


ActionCard.defaultProps = {
  minHeight: 274,
  btnDisabled: false
}

// ActionCard.displayName = 'ActionCard'

/** @component */
export default ActionCard

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ProgressBar } from '../../..'

const ProgressBox = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  font-family: Nunito Sans;
  font-size: 13px;
  line-height: 13px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 8px;
`

const Value = styled.div`
  font-family: Nunito Sans;
  font-size: 11px;
  line-height: 11px;
  display: inline-block;
  margin-right: 5px;
  color: ${({ color }) => color};
`

const ProgressRankingItem = styled(({
  className,
  value,
  label,
  color,
  trackColor,
  trackSize,
  maxValue
}) => (
  <div className={className}>
    <Label>
      {label}
    </Label>
    <ProgressBox>
      <Value color={color}>
        {value}
      </Value>
      <ProgressBar
        thumbColor={color}
        trackColor={trackColor}
        size={trackSize}
        value={Math.round((value / maxValue * 100) * 100) / 100}
      />
    </ProgressBox>
  </div>
))`
  margin-bottom: 20px;
`

const { number, string } = PropTypes

ProgressRankingItem.propTypes = {
  /** The progress fill value. */
  value: number.isRequired,
  /** The item label text. */
  label: string.isRequired,
  /** The progress max value to calc the fill value percentage. */
  maxValue: number,
  /** The `ProgressBar` fill and value color. */
  color: string,
  /** The `ProgressBar` track background color. */
  trackColor: string,
  /** The `ProgressBar` track size options. */
  trackSize: string
}

ProgressRankingItem.displayName = 'ProgressRankingItem'

/** @component */
export default ProgressRankingItem

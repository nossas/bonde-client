import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ProgressContainer = styled.div`
  background-color: #fff;
  box-shadow: #E3E3E3 0px 15px 18px -10px inset;
  padding: 2rem;
  text-align: center;
`

const ProgressBar = styled.div`
  border: none;
  border-radius: 290486px;
  display: block;
  height: 1rem;
  margin: 1rem 0 !important;
  background-color: #dbdbdb;
`

const Progress = styled.div`
  border-radius: 290486px;
  height: 1rem;
  width: ${props => props.value}%;
  background-color: ${props => props.fillColor};
`

Progress.defaultProps = {
  value: 0
}

const ProgressFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProgressUI = ({
  fillColor,
  progress,
  pledged,
  pledgedLabel: PledgedLabel,
  goal,
  goalLabel: GoalLabel,
  donations,
  donationsLabel: DonationsLabel,
  dateRemaining,
  dateRemainingLabel: DateRemainingLabel
}) => (
  <ProgressContainer>
    {pledged && <PledgedLabel value={pledged} />}
    <ProgressBar>
      <Progress fillColor={fillColor} value={progress} />
    </ProgressBar>
    <ProgressFooter>
      {donations && <DonationsLabel value={donations} />}
      {goal && <GoalLabel value={goal} />}
      {dateRemaining && <DateRemainingLabel value={dateRemaining} />}
    </ProgressFooter>
  </ProgressContainer>
)

ProgressUI.propTypes = {
  fillColor: PropTypes.string.isRequired,
  progress: PropTypes.number,
  pledged: PropTypes.number,
  pledgedLabel: PropTypes.any,
  donations: PropTypes.number,
  donationsLabel: PropTypes.any,
  goal: PropTypes.number,
  goalLabel: PropTypes.any
}

export default ProgressUI

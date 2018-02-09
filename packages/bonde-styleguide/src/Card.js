import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Title = styled.span`
  display: block;
  font-family: Nunito Sans;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.15;
  letter-spacing: 0.5px;
  text-align: left;
  color: #4a4a4a;
  text-transform: uppercase;
  margin: 16px 0;
  min-height: ${props => !props.notitle ? '14px' : 0};
`

export const Card = styled.div`
  border-radius: 1px;
  background-color: ${props => props.background || '#FFFFFF'};
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, .04);
  padding: ${props => props.padding || '16px'};
  height: 100%;
  ${props => props.centralized && `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `}
`

const CardWrapper = ({ title, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Title {...props}>{title}</Title>
    <Card {...props} />
  </div>
)

const { string, bool } = PropTypes

Title.propTypes = {
  notitle: bool.isRequired
}

Title.defaultProps = {
  notitle: false
}

Card.propTypes = {
  background: string.isRequired,
  padding: string.isRequired,
  centralized: string.isRequired
}

Card.defaultProps = {
  background: '#FFFFFF',
  padding: '16px',
  centralized: false
}

CardWrapper.propTypes = {
  title: string
}

CardWrapper.Title = Title

export default CardWrapper

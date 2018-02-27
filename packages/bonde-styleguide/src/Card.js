import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const defaultPX = (value) => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value
}

const Title = styled.span`
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
  min-height: ${props => props.notitle ? 0 : '14px'};
`

const Card = styled.div`
  border-radius: 1px;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, .04);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${props => props.background};
  min-height: ${props => defaultPX(props.minHeight)};
  max-height: ${props => defaultPX(props.maxHeight)};
  ${props => props.bottom && `
    display: flex;
    align-items: flex-end;
  `}

  &::-webkit-scrollbar {
    width: 33px;
  }

  &::-webkit-scrollbar-track {
    background-clip: padding-box;
    background-color: rgba(151,151,151,.25);
    border: 20px solid transparent;
    border-left-width: 16px;
    border-right-width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: rgba(74,74,74,.75);
    border: 20px solid transparent;
    border-left-width: 15px;
    border-right-width: 15px;
  }
`

const Image = styled.div`
  display: block;
  width: 100%;
  height: 185px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center center;
`

const Content = styled.div`
  width: 100%;
  height: calc(100% - (${props => props.paddingY} * 2));
  padding-top: ${props => props.paddingY};
  padding-bottom: ${props => props.paddingY};
  padding-left: ${props => props.paddingX};
  padding-right: ${props => props.paddingX};
  ${props => props.centralized && `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `} 
`

const CardWrapper = ({ title, children, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Title {...props}>{title}</Title>
    <Card {...props}>
      {props.image && <Image {...props} />}
      <Content {...props} children={children} />
    </Card>
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
  minHeight: PropTypes.string.isRequired,
  maxHeight: PropTypes.string.isRequired
}

Card.defaultProps = {
  background: '#FFFFFF',
  minHeight: '0px',
  maxHeight: 'inherit',
}

Content.propTypes = {
  centralized: bool.isRequired,
  paddingY: string.isRequired,
  paddingX: string.isRequired,
}

Content.defaultProps = {
  centralized: false,
  paddingY: '16px',
  paddingX: '16px',
}

CardWrapper.displayName = 'Card'

CardWrapper.propTypes = {
  title: string
}

CardWrapper.Title = Title

export default CardWrapper

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../../content/Button/Button'
import Icon from '../../content/Icon/Icon'

const FlatButton = styled(({ className, children, ...props }) => (
  <Button {...props} className={className} flat>
    {children}
  </Button>
))`
  min-width: 0 !important;
  padding: 0 8px !important;
  font-size: 11px !important;
  ${props => props.color && `
    color: ${props.color} !important;
  `}
`

FlatButton.displayName = 'FlatButton'

class IconButton extends React.Component {
  state = { color: '#000000' }

  handleColorMouseEnter = () => this.setState({ color: '#424242' })
  handleColorMouseLeave = () => this.setState({ color: '#000000' })
  handleColorMouseDown = () => this.setState({ color: '#9b9b9b' })
  handleColorMouseUp = () => this.setState({ color: '#000000' })

  render () {
    const { disabled } = this.props

    return (
      <FlatButton
        onClick={this.props.onClick}
        onMouseEnter={this.handleColorMouseEnter}
        onMouseLeave={this.handleColorMouseLeave}
        onMouseDown={this.handleColorMouseDown}
        onMouseUp={this.handleColorMouseUp}
        disabled={disabled}
      >
        <Icon
          name={this.props.name}
          size='11'
          margin='-2px 5px 0'
          color={!disabled ? this.state.color : '#aaaaaa'}
        />
      </FlatButton>
    )
  }
}

/**
 * The only true `Pagination` component.
 */
class Pagination extends React.Component {
  state = {
    activeIndex: this.props.activeIndex,
  }

  handleActiveIndex = activeIndex => {
    this.setState({ activeIndex })
    return activeIndex
  }

  render () {
    const {
      pages,
      activeColor,
      onClickFirst,
      onClickPrev,
      onClickNext,
      onClickLast,
      onClickItem,
      textPrev,
      textNext,
      iconFirst,
      iconLast,
    } = this.props

    const { activeIndex } = this.state
    const isFirst = activeIndex === 0
    const isLast = activeIndex === pages -1

    return (
      <span>
        <IconButton
          onClick={() => onClickFirst(this.handleActiveIndex(0))}
          disabled={isFirst}
          name={iconFirst}
        />
        <FlatButton
          onClick={() => onClickPrev(this.handleActiveIndex(activeIndex -1))}
          disabled={isFirst}
        >
          {textPrev}
        </FlatButton>

        {Array(pages).fill().map((o, index) => (
          <FlatButton
            key={Math.random()}
            onClick={f => onClickItem(this.handleActiveIndex(index))}
            color={activeIndex === index ? activeColor : ''}
            disabled={activeIndex === index}
          >
            {index + 1}
          </FlatButton>
        ))}

        <FlatButton
          onClick={() => onClickNext(this.handleActiveIndex(activeIndex +1))}
          disabled={isLast}
        >
          {textNext}
        </FlatButton>
        <IconButton
          onClick={() => onClickLast(this.handleActiveIndex(pages -1))}
          disabled={isLast}
          name={iconLast}
        />
      </span>
    )
  }
}

const { oneOfType, number, func, node, string } = PropTypes

Pagination.propTypes = {
  /** Number of total pages. */
  pages: number,
  /** Active index. e.g. If the active page is 1, the index is 0. */
  activeIndex: number.isRequired,
  /** Active item color. */
  activeColor: string.isRequired,
  /** Callback when clicks the icon to take to the first page. */
  onClickFirst: func,
  /** Callback when clicks the button to take to the previous page. */
  onClickPrev: func,
  /** Callback when clicks the button to take to the next page. */
  onClickNext: func,
  /** Callback when clicks the icon to take to the last page. */
  onClickLast: func,
  /** Callback when clicks the button to take to the specific page. */
  onClickItem: func,
  /** Previous button text. */
  textPrev: oneOfType([node, func]),
  /** Next button text. */
  textNext: oneOfType([node, func]),
  /** First Icon name. */
  iconFirst: string,
  /** Last Icon name. */
  iconLast: string,
}

Pagination.defaultProps = {
  pages: 1,
  activeIndex: 0,
  activeColor: '#ee0099',
  onClickFirst: f => f,
  onClickPrev: f => f,
  onClickNext: f => f,
  onClickLast: f => f,
  onClickItem: f => f,
  textPrev: 'Prev',
  textNext: 'Next',
  iconFirst: 'double-arrow-left',
  iconLast: 'double-arrow-right',
}

Pagination.displayName = 'Pagination'

/* @component */
export default Pagination

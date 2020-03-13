import React from 'react';
import styled from 'styled-components';
import Flexbox from '../../layout/Flexbox2/Flexbox2';
import { Button } from '../../content/Button/Button';
import { Icon } from '../../content/Icon/Icon';
import InputPage from './InputPage';

const FlatButton = styled(({ className, children, ...props }) => (
  <Button {...props} className={className} flat>
    {children}
  </Button>
))`
  min-width: 0 !important;
  padding: 0 8px !important;
  font-size: 11px !important;
  ${props =>
    props.color &&
    `
    color: ${props.color} !important;
  `}
`;

FlatButton.displayName = 'FlatButton';

interface IconButtonProps {
  disabled: boolean;
  onClick: any;
  name: string;
}

class IconButton extends React.Component<IconButtonProps> {
  state = { color: '#000000' };

  handleColorMouseEnter = () => this.setState({ color: '#424242' });
  handleColorMouseLeave = () => this.setState({ color: '#000000' });
  handleColorMouseDown = () => this.setState({ color: '#9b9b9b' });
  handleColorMouseUp = () => this.setState({ color: '#000000' });

  render() {
    const { disabled } = this.props;

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
          size="11"
          margin="-2px 5px 0"
          color={!disabled ? this.state.color : '#aaaaaa'}
        />
      </FlatButton>
    );
  }
}

interface PaginationProps {
  onChangePage: Function;
  pageIndex: number;
  pages: number;
  textPrev: React.ReactNode | Function;
  textNext: React.ReactNode | Function;
  iconFirst: string;
  iconLast: string;
}

/**
 * The only true `Pagination` component.
 */
export class Pagination extends React.Component<PaginationProps> {
  static defaultProps = {
    pages: 1,
    pageIndex: 0,
    textPrev: 'Prev',
    textNext: 'Next',
    iconFirst: 'double-arrow-left',
    iconLast: 'double-arrow-right',
  };

  handleActiveIndex = activeIndex => {
    this.props.onChangePage(activeIndex);
  };

  render() {
    const {
      pageIndex,
      pages,
      textPrev,
      textNext,
      iconFirst,
      iconLast,
    } = this.props;

    const isFirst = pageIndex === 0;
    const isLast = pageIndex === pages - 1;

    return (
      <Flexbox horizontal spacing="between" middle>
        <div>
          <IconButton
            onClick={() => this.handleActiveIndex(0)}
            disabled={isFirst}
            name={iconFirst}
          />
          <FlatButton
            onClick={() => this.handleActiveIndex(pageIndex - 1)}
            disabled={isFirst}
          >
            {textPrev}
          </FlatButton>
        </div>
        <InputPage
          pages={pages}
          pageIndex={pageIndex}
          onChangePage={this.handleActiveIndex.bind(this)}
        />
        <div>
          <FlatButton
            onClick={() => this.handleActiveIndex(pageIndex + 1)}
            disabled={isLast}
          >
            {textNext}
          </FlatButton>
          <IconButton
            onClick={() => this.handleActiveIndex(pages - 1)}
            disabled={isLast}
            name={iconLast}
          />
        </div>
      </Flexbox>
    );
  }
}

/** @component */
// export default Pagination;

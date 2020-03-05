import React from 'react';

import styled from 'styled-components';
import { px } from '../../../utils';

const SpacingStyled = styled.div`
  ${props =>
    props.margin && props.margin.top && `margin-top: ${px(props.margin.top)};`}
  ${props =>
    props.margin &&
    props.margin.bottom &&
    `margin-bottom: ${px(props.margin.bottom)};`}
  ${props =>
    props.margin &&
    props.margin.left &&
    `margin-left: ${px(props.margin.left)};`}
  ${props =>
    props.margin &&
    props.margin.right &&
    `margin-right: ${px(props.margin.right)};`}

  ${props =>
    props.padding &&
    props.padding.top &&
    `padding-top: ${px(props.padding.top)};`}
  ${props =>
    props.padding &&
    props.padding.bottom &&
    `padding-bottom: ${px(props.padding.bottom)};`}
  ${props =>
    props.padding &&
    props.padding.left &&
    `padding-left: ${px(props.padding.left)};`}
  ${props =>
    props.padding &&
    props.padding.right &&
    `padding-right: ${px(props.padding.right)};`}
`;
interface Props {
  margin?: {
    x?: number;
    y?: number;
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };

  padding?: {
    x?: number;
    y?: number;
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
  children?: any;
}

/**
 * The only true Spacing component.
 */
const Spacing = ({
  margin = { x: 0, y: 0 },
  padding = { x: 0, y: 0 },
  ...ownProps
}: Props) => {
  const { x: marginX, y: marginY } = margin;
  const { x: paddingX, y: paddingY } = padding;
  return (
    <SpacingStyled
      {...ownProps}
      margin={{
        top: marginY || margin.top,
        bottom: marginY || margin.bottom,
        left: marginX || margin.left,
        right: marginX || margin.right,
      }}
      padding={{
        top: paddingY || padding.top,
        bottom: paddingY || padding.bottom,
        left: paddingX || padding.left,
        right: paddingX || padding.right,
      }}
    />
  );
};

/** @component */
export default Spacing;

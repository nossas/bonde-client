import React from 'react';
import styled from 'styled-components';
// import TabItem from '../TabItem/TabItem'

interface TabProps {
  className: string;
  /** Use the `TabItem` component as children to compose. */
  children: any;
  /** Invert the `TabItem`s color style. */
  inverted: boolean;
}

const Tab = styled(({ children, className, inverted = false }: TabProps) => (
  <div className={className}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { inverted, key: Math.random() })
    )}
  </div>
))`
  display: flex;
  align-items: center;
`;

/** @component */
export default Tab;

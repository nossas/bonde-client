import React from 'react';
import styled from 'styled-components';
import { Text } from '../Text/Text';

export const LinkShowAll = styled(() => <Text as="a" />)`
  font-size: 11px !important;
  font-weight: 800 !important;
  line-height: 1.36 !important;
  text-transform: uppercase;
  cursor: pointer;
  display: block;
`;

LinkShowAll.displayName = 'LinkShowAll';

/** @component */
// export default LinkShowAll;

// import React from 'react';
import styled from 'styled-components';
import { FormField } from 'bonde-components';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 17px;

  ${FormField} {
    margin: 0;
    padding: 0;
    flex-grow: 1;
  }
`;

export const Addon = styled.span`
  text-transform: lowercase;
  font-size: 16px;
  margin-left: 5px;
  color: #aaa;
`
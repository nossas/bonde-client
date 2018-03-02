import React from 'react'
import styled from 'styled-components'

/**
 * The generic scroll box component.
 */
const ScrollBox = styled.div`{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

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
}`

/* @component */
export default ScrollBox

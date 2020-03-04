import React from 'react'
import styled from 'styled-components'

const InputNumber = styled.input`
  border: 1px solid #c7c7c7;
  width: 40px;
  text-align: right;
`

const Span = styled.span`
  font-family: 'Nunito Sans',sans-serif;
  font-size: 13px;
`

const Prefix = styled.span`
  margin: 0 5px;
`

const InputPage = ({ pageIndex, pages, onChangePage }) => (
  <Span>
    <InputNumber
      type='number'
      min={1}
      max={pages}
      defaultValue={pageIndex + 1}
      onKeyPress={(e) => {
        const index = e.target.value - 1
        if (e.key === 'Enter' &&  index < pages && index > -1) {
          onChangePage(index)
        }
      }}
    />
    <Prefix>/</Prefix>
    {pages}
  </Span>
)

/** @component */
export default InputPage
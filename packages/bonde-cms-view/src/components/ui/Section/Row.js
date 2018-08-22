import styled from 'styled-components'

const Row = styled.div`
  // Fixed any values to this ui
  width: 83.33333%;
  margin: 0 auto;
  padding: 5em 0;

  &::after {
    content: "";
    clear: both;
    display: table;
  }
`

export default Row

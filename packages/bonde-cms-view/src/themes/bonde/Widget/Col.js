import styled from 'styled-components'

const getWidthString = (span) => {
  if (!span) return

  const width = span / 12 * 100
  return `width: ${width}%;`
}

const Col = styled.div`
  // Fixed spacing betweeb columns
  padding: 0 1rem;

  float: left;
  box-sizing: border-box;

  ${({ xs }) => (xs ? getWidthString(xs) : "width: 100%")};

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`

export default Col

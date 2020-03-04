import styled from 'styled-components'

const Link = styled.a`
  color: #ee0099!important;
  text-decoration: none;

  &:visited {
    color: #b4006c!important;
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`

Link.displayName = 'Link'

/** @component */
export default Link

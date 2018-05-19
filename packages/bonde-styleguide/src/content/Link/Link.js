import Text from '../Text/Text'

const Link = Text.withComponent('a').extend`
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

export default Link

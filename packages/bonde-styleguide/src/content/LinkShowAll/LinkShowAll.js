import Text from '../Text/Text'

const LinkShowAll = Text.withComponent('a').extend`
  font-size: 11px !important;
  font-weight: 800 !important;
  line-height: 1.36 !important;
  text-transform: uppercase;
  cursor: pointer;
  display: block;
`

/* @component */
export default LinkShowAll

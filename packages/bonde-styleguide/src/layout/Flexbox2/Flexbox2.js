import PropTypes from 'prop-types'
import styled from 'styled-components'
import { borderSpacing, borderSpacingPropTypes } from '../../utils'


/**
 * The only true flexbox container.
 */
const Flexbox = styled.div`
  display: flex;

  ${props => props.horizontal && `
    width: 100%;
    flex-direction: row;
  `}
  ${props => props.vertical && `
    height: 100%;
    flex-direction: column;
  `}

  ${props => props.middle && `
    align-items: center;
    justify-content: center;
  `}

  ${props => props.end && `
    align-items: end;
    justify-content: flex-end;
  `}

  ${props => props.justify && `
    justify-content: ${props.justify};  
  `}

  ${props => props.spacing && `
    justify-content: space-${props.spacing}
  `}

  ${props => props.colSize && `
    & > * {
      width: ${props.colSize};
    }
  `}

  ${props => borderSpacing('margin', props.margin)}
  ${props => borderSpacing('padding', props.padding)}
`

Flexbox.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  middle: PropTypes.bool,
  end: PropTypes.bool,
  spacing: PropTypes.oneOf(['around', 'between']),
  colSize: PropTypes.string,
  margin: borderSpacingPropTypes,
  padding: borderSpacingPropTypes,
}

Flexbox.defaultProps = {
  margin: {},
  padding: {},
}

Flexbox.displayName = 'Flexbox2'

/* @component */
export default Flexbox

import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The generic data list component.
 */
const DataList = styled.div`
  display: table;
  border-collapse: ${props => props.border};
  border-spacing: 0 15px;
  width: 100%;
`

const { oneOf } = PropTypes

DataList.propTypes = {
  /** Flag to show or hide the wrapper border. */
  border: oneOf(['collapse', 'separate', 'unset'])
}

DataList.defaultProps = {
  border: 'unset'
}

DataList.displayName = 'DataList'

/** @component */
export default DataList

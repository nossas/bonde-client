import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The generic data list component.
 */
const DataList = styled.div`{
  display: table;
  border-collapse: ${props => props.border ? 'collapse' : 'unset'};
  width: 100%;
}`

const { bool } = PropTypes

DataList.propTypes = {
  /** Flag to show or hide the wrapper border. */
  border: bool
}

DataList.defaultProps = {
  border: false
}

/* @component */
export default DataList

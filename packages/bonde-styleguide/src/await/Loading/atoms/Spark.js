import PropTypes from 'prop-types'
import styled from 'styled-components'

const Spark = styled.path.attrs({
  d: props => props.d
})`
  fill: ${props => props.colorInit};
  animation: ${props => `${props.animation} ${props.duration} infinite`};
`

const { string } = PropTypes

Spark.propTypes = {
  d: string.isRequired, // vector path attribute
  colorInit: string.isRequired,
  animation: string.isRequired,
  duration: string.isRequired
}

export default Spark

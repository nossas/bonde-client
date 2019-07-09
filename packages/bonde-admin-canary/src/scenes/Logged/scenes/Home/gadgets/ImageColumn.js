import React from 'react'
import { Image, IconColorful } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const defaultImageStyle = (props = {}) => ({
  backgroundColor: '#424242',
  borderRadius: '40px',
  padding: '6px 7px 5px 8px',
  textAlign: 'center',
  ...props
})

const DefaultImage = (props) => (
  <div style={defaultImageStyle(props)}>
    <IconColorful name='community' size={25} />
  </div>
)

const ImageCol = ({ value }) => value
  ? <Image src={value} width={40} height={40} rounded={40} />
  : <DefaultImage width='40px' height='40' />

ImageCol.propTypes = {
  value: PropTypes.string
}

export default ImageCol

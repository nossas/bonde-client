import React from 'react'
import { IconColorful, Text, Button, Flexbox2 as Flexbox } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const Success = ({ message, closeToast }) => (
  <div
    style={{
      background: '#fff',
      borderStyle: 'none none none solid',
      borderWidth: '3px',
      borderColor: '#50e3c2',
      width: '100%',
      marginBottom: '30px',
      padding: '5px 0 5px 30px'
    }}
  >
    <Flexbox horizontal align='middle' spacing='between'>
      <IconColorful name='mobilization' size={35} />
      <div
        style={{
          flexGrow: 1,
          marginLeft: '30px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Text>{message}</Text>
      </div>
      <Button onClick={closeToast} flat>X</Button>
    </Flexbox>
  </div>
)

Success.propTypes = {
  message: PropTypes.string,
  closeToast: PropTypes.func
}

export default Success

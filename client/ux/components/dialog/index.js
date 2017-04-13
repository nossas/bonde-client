import React from 'react'
import Button from '../button'

if (require('exenv').canUseDOM) require('./styles.scss')

const Dialog = ({ children, onConfirm, onCancel }) => (
  <div className='dialog'>
    <div className='content--dialog'>
      {children}
    </div>
    <div className='footer--dialog'>
      <Button onClick={onConfirm}>Confirmar</Button>
      <Button onClick={onCancel}>Cancelar</Button>
    </div>
  </div>
)

export default Dialog

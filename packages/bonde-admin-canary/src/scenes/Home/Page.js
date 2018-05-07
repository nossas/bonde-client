import React from 'react'

export default ({ name, onChangeName }) => (
  <div>
    <p>Your name is {name}</p>
    <input value={name} onChange={onChangeName} />
  </div>
)

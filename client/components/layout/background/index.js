import React from 'react'

// Current module dependencies
if (process.env.BROWSER) require('./index.scss')

const Background = ({ children }) => (
  <div className='bg-cover bg-center bg-reboo absolute top-0 right-0 bottom-0 left-0'>
    <div className='table col-3 mx-auto full-height'>
      <div className='table-cell align-middle'>
        {children}
      </div>
    </div>
  </div>
)

export default Background

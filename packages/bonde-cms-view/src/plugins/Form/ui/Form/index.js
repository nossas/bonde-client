import React from 'react'
import FormContent from './FormContent'

export default class extends React.Component {
  
  render() {
    const { children, bgColor } = this.props

    return (
      <FormContent
        bgColor={bgColor}
        onSubmit={(e) => {
          e.preventDefault()
          debugger
          console.log('submit', e)
        }}
      >
        {children}
      </FormContent>
    )
  }
}

import React from 'react'
import RequestTokenForm from './RequestTokenForm'
import SubmittedSuccessfully from './SubmittedSuccessfully'

export default class ForgetPassword extends React.Component {
  state = { submitted: false }

  render () {
    return !this.state.submitted ? (
      <RequestTokenForm
        onSuccess={() => this.setState({ submitted: true })}
      />
    ) : <SubmittedSuccessfully />
  }
}

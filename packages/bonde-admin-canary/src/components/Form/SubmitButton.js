import React from 'react'
import { Button } from 'bonde-styleguide'
import { isValid, isPristine } from 'redux-form'
import { connect } from 'services/redux'

const mapStateToProps = state => ({
  valid: isValid('components/Form')(state),
  pristine: isPristine('components/Form')(state)
})

export default connect(mapStateToProps)(
  ({ children, valid, pristine }) => (
    <Button type='submit' disabled={pristine || !valid}>
      {children}
    </Button>
  )
)

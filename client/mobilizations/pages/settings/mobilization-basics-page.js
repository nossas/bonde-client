import React from 'react'
import { reduxForm } from 'redux-form'

// Current module dependencies
import MobilizationBasicsForm, { fields, validate } from '../../components/mobilization-basics-form'
import { mapStateToProps, mapActionCreatorsToProps } from './map-to-props'

const MobilizationBasicsPage = reduxForm({
  form: 'mobilizationBasicsForm',
  fields: [...fields, 'id'],
  validate
},
  mapStateToProps,
  mapActionCreatorsToProps
)(props => <MobilizationBasicsForm floatSubmit {...props} />)

export default MobilizationBasicsPage

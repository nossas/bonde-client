import React from 'react'
import { reduxForm } from 'redux-form'
import MobilizationBasicsForm, { fields, validate } from '../../components/mobilization-basics-form'

import { mapStateToProps, mapActionCreatorsToProps } from './map-to-props'


export default reduxForm({
    form: 'mobilizationBasicsForm',
    fields: [...fields, 'id'],
    validate
  },
  mapStateToProps,
  mapActionCreatorsToProps
)(props => <MobilizationBasicsForm floatSubmit={true} {...props} />)

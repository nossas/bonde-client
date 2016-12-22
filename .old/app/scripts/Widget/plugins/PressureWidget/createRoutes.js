import React from 'react'
import { Route } from 'react-router'

import { FormPage, EmailPage } from './settings'


export default () => [
  <Route path="/pressure/form" component={FormPage} />,
  <Route path="/pressure/email" component={EmailPage} />
]

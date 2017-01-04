import React, { Component, PropTypes } from 'react'

import { MobilizationBasicsForm } from '../components/settings'

const MobilizationBasicsNewFormPage = props => (
  <div className="clearfix overflow-auto">
    <div className="p3 lg-col-5 mx-auto">
      <h2 className="h1 mt0 mb3 center px5">
        Qual o objetivo da sua mobilização?
      </h2>

      <MobilizationBasicsForm
        {...props}
        className="bg-white"
      />

      <p
        className="lightgray center"
        style={{ fontSize: '.9rem', marginTop: '1.5rem' }}
      >
        Fique tranquil@ vc poderá editar depois se achar necessário.
      </p>
    </div>
  </div>
)

export default MobilizationBasicsNewFormPage

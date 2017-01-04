import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'

import * as Paths from '../../Paths'
import * as Selectors from '../MobilizationSelectors'
import * as MobilizationActions from '../MobilizationActions'
import { TabMenuItem } from '../../components'
import { FontPreview } from '../components/settings'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormDropdown
} from '../../Dashboard/Forms'

const fonts = [
  ['armata', 'Armata'], ['arvo', 'Arvo'], ['dosis', 'Dosis'], ['droid-sans', 'Droid Sans'],
  ['fjalla-one', 'Fjalla One'], ['glegoo', 'Glegoo'], ['lato', 'Lato'],
  ['merriweather', 'Merriweather'], ['merriweather-sans', 'Merriweather Sans'],
  ['open-sans', 'Open Sans'], ['oswald', 'Oswald'], ['pfdin', 'PF Din'],
  ['proxima-nova', 'Proxima Nova'], ['pt-mono', 'PT Mono'], ['ubuntu', 'Ubuntu'],
]

const MobilizationFontsPage = ({
  ...rest,
  fields: {
    header_font: headerFont,
    body_font: bodyFont
  },
  mobilization,
  location,
  // Actions
  editMobilizationAsync
}) => {
  const fontsMobilizationPath = Paths.fontsMobilization(mobilization.id)
  const handleSubmit = values => editMobilizationAsync({ ...mobilization, ...values })

  return (
    <div className="flex-auto bg-silver gray relative">
      <div className="bg-white px3 clearfix">
        <h2 className="mb3">Estilo da Página</h2>
        <div>
          <ul className="list-reset mb0">
            <TabMenuItem
              path={fontsMobilizationPath}
              text="Fontes"
              isActive={fontsMobilizationPath === location.pathname}
            />
          </ul>
        </div>
      </div>

      <div className="py3 px4">
        <FormRedux onSubmit={handleSubmit} {...rest}>
          <FormGroup controlId="headerFont" {...headerFont}>
            <ControlLabel>Fonte dos títulos</ControlLabel>
            <FormDropdown>
              {fonts.map(font =>
                <option key={`${font[0]}-header`} value={font[0]}>{font[1]}</option>
              )}
            </FormDropdown>
          </FormGroup>
          <FontPreview
            text="Os títulos ficarão assim"
            className={`${headerFont.value}-header`}
          />

          <FormGroup controlId="bodyFont" {...bodyFont}>
            <ControlLabel>Fonte do texto</ControlLabel>
            <FormDropdown>
              {fonts.map(
                font => <option key={`${font[0]}-body`} value={font[0]}>{font[1]}</option>
              )}
            </FormDropdown>
          </FormGroup>
          <FontPreview
            componentClass='p'
            text="Os títulos ficarão assim"
            className={`${bodyFont.value}-body`}
          />
        </FormRedux>
      </div>
    </div>
  )
}

MobilizationFontsPage.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // Actions
  editMobilizationAsync: PropTypes.func.isRequired
}

const fields = ['header_font', 'body_font']
const validate = values => {
  const errors = {}
  if (!values.header_font) {
    errors.header_font = 'Você deve escolher uma fonte para títulos'
  }
  if (!values.body_font) {
    errors.body_font = 'Você deve escolher uma fonte para textos'
  }
  return errors
}
const mapStateToProps = (state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    mobilization,
    initialValues: mobilization || {}
  }
}

export default reduxForm(
  { form: 'mobilizationForm', fields, validate },
  mapStateToProps,
  { ...MobilizationActions }
)(MobilizationFontsPage)

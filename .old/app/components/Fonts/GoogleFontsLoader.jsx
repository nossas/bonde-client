import React, { PropTypes } from 'react'

import { getGoogleFontsLoadURL, needsToLoadGoogleFonts } from '../../util/font-name-handler'

const GoogleFontsLoader = ({ fonts }) => (
  needsToLoadGoogleFonts(fonts)
    ? <link href={getGoogleFontsLoadURL(fonts)} rel="stylesheet" />
    : <no-script></no-script>
)

GoogleFontsLoader.propTypes = {
  fonts: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}

export default GoogleFontsLoader

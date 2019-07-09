import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, IconColorful, Title } from 'bonde-styleguide'

const ListEmpty = ({ iconColorfulName, text }) => (
  <Flexbox vertical middle>
    <IconColorful name={iconColorfulName} size={90} />
    <Title.H4
      align='center'
      color='#000'
      style={{ maxWidth: '276px' }}
    >
      {text}
    </Title.H4>
  </Flexbox>
)

ListEmpty.propTypes = {
  iconColorfulName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default ListEmpty

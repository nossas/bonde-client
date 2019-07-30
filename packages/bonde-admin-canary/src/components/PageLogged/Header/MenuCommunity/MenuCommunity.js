import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  IconBot
  // TODO: add import icons
  // IconSettings,
  // IconPage,
  // IconChart
} from './icons'
import { Flexbox, Spacing } from 'bonde-styleguide'

const MenuCommunity = () => {
  const items = [
    // TODO: add routes, icons and activeHandle
    // { name: 'chart', path: '/', icon: <IconChart color='white' /> },
    // { name: 'pages', path: '/', icon:  <IconPage color='white' /> },
    { name: 'chatbot', path: `/admin/${1}/chatbot`, icon: <IconBot color='white'/> }
    // { name: 'settings', path: '/', icon: <IconSettings color='white'/> }
  ]

  return (
    <Flexbox horizontal start>
      {items.map(i => {
        return (
          <Spacing key={i.name} margin={{ left: 12 }}>
            <Link to={i.path}>
              { i.icon }
            </Link>
          </Spacing>
        )
      })}
    </Flexbox>
  )
}

MenuCommunity.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.func
  }))
}

export default MenuCommunity

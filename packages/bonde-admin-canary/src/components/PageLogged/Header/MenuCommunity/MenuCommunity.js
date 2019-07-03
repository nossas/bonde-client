import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { IconBot, IconSettings, IconPage, IconChart } from './icons'
import { Flexbox, Spacing } from 'bonde-styleguide'

const items = [
  { name: 'chart', path: '/', icon: <IconChart /> },
  { name: 'pages', path: '/', icon:  <IconPage /> },
  { name: 'chatbot', path: '/admin/1/chatbot', icon: <IconBot /> },
  { name: 'settings', path: '/', icon: <IconSettings /> }
]

const MenuCommunity = () => (
  <Flexbox horizontal start padding={8}>
    {items.map(i => {
      return (
        <Spacing margin={{ left: 8 }}>
          <Link to={i.path}>
            { i.icon }
          </Link>
        </Spacing>
      )
    })}
  </Flexbox>
)

MenuCommunity.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string
  }))
}

export default ({ t , props }) => (
  <MenuCommunity
    t={t}
    items={items}
    {...props}
  />
)

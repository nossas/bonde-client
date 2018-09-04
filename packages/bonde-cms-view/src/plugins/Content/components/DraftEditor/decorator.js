import React from 'react'
import PropTypes from 'prop-types'
import { CompositeDecorator, Entity } from 'draft-js'

// Link decorator
const linkStrategy = (contentBlock, callback) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    if (entityKey) {
      const entityInstance = Entity.get(entityKey)
      return (
          entityInstance !== null &&
          entityInstance.getType() === 'LINK'
      )
    }
    return false
  }, callback)
}

const Link = ({ children, entityKey }) => {
  const { href, target } = Entity.get(entityKey).getData()

  return (
    <a href={href} target={target}>{children}</a>
  )
}

Link.propTypes = {
  entityKey: PropTypes.string.isRequired
}

export default new CompositeDecorator([
  {
    strategy: linkStrategy,
    component: Link
  }
])

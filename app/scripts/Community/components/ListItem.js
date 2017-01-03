import React, { PropTypes } from 'react'

const ListItem = props => {
  const { onClick, community: { id, name, image } } = props
  return (
    <div className='ListItem' onClick={() => onClick(id)} style={{ cursor: 'pointer' }}>
      <u
        className='logo-icon nossas left'
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
          boxShadow: 'none'
        }}
      />
      <p>
        <span>{name}</span>
        <i className='fa fa-arrow-right gray right' aria-hidden='true' />
      </p>
    </div>
  )
}

ListItem.propTypes = {
  community: PropTypes.object.isRequired
}

export default ListItem

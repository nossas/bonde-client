import PropTypes from 'prop-types';
import React from 'react';

import { Tag } from '../components'

const BlockTag = (props) => {
  const { tags, ...rest } = props
  const filtered = tags.filter(tag => !!tag.trim())

  return (
    <div className='mb1 flex flex-wrap h5'>
      {filtered.map((tag, index) => <Tag key={`${tag}-${index}`} value={tag} {...rest} />)}
    </div>
  )
}

BlockTag.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onRemove: PropTypes.func
}

BlockTag.defaultProps = {
  tags: []
}

export default BlockTag

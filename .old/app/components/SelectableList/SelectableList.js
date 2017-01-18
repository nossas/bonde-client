import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt
} from '../../scripts/Mobilization/components/MobilizationList/MobilizationListItem'
import MobilizationList from '../../scripts/Mobilization/components/MobilizationList'
import { setSelectedIndex } from './SelectableListActions'

import './selectable-list.scss'

export const SelectableList = ({
  list,
  dispatch,
  selectedIndex,
  setSelectedIndex,
  activeCondition,
  emptyListText,
  emptyListIcon
}) => (
  <div className="selectable-list col-12">
    <MobilizationList>
      {
        list.length ? list.map((item, index) => (
          <MobilizationListItem
            key={`template-${index}`}
            onClick={() => { setSelectedIndex(item.id, item) }}
            className={classnames(
              'border border-whisper',
              { 'border-pagenta': item.id === selectedIndex }
            )}
          >
            <MobilizationListItemAvatar {...item} />
            <MobilizationListItemName {...item} className="col-7" />
            <MobilizationListItemCreatedAt {...item} />
          </MobilizationListItem>
        )) : (
          <div>
            <div className="center">
              <i className={`fa fa-${emptyListIcon} mb1`} style={{ fontSize: '5rem' }} />
            </div>
            <div className="center">{emptyListText}</div>
          </div>
        )
      }
    </MobilizationList>
  </div>
)

SelectableList.propTypes = {
  list: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func.isRequired,
  emptyListText: PropTypes.string,
  emptyListIcon: PropTypes.string
}

SelectableList.defaultProps = {
  emptyListText: 'Lista vazia',
  emptyListIcon: 'frown-o'
}

export default SelectableList

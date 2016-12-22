import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { SelectableList } from '../../../../../components/SelectableList'
import { setSelectedIndex } from '../../../../../components/SelectableList/SelectableListActions'
import { FilterableSearchBar } from '../../../../../components/FilterableSearchBar'

class MobilizationTemplatesSelectableList extends Component {
  render() {
    const {
      list,
      filterableSearchBarList,
      selectedIndex,
      dispatch,
      onClickButton
    } = this.props

    const buttonDisabled = !filterableSearchBarList.filter(item => item.id === selectedIndex).length

    return (
      <div className="mobilization-templates-selectable-list">
        <FilterableSearchBar list={list} />

        <div className="bg-white rounded-bottom" style={{ padding: '1.6rem 2rem' }}>
          <SelectableList
            list={filterableSearchBarList}
            activeCondition={(item, index) => item.id === selectedIndex}
            onClick={(item, index) => {
              dispatch(setSelectedIndex(item.id === selectedIndex ? undefined : item.id))
            }}
            emptyListText="Não existe nenhum template com esse nome"
          />
          <button
            disabled={buttonDisabled}
            style={{ marginTop: '1.6rem' }}
            onClick={onClickButton}
            className={classnames(
              'btn h3 col-12 white p2 rounded',
              buttonDisabled ? 'bg-gray95' : 'bg-pagenta'
            )}
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }
}

MobilizationTemplatesSelectableList.propTypes = {}

const mapStateToProps = state => ({
  selectedIndex: state.selectableList.selectedIndex,
  filterableSearchBarList: state.filterableSearchBar.list
})

export default connect(mapStateToProps)(MobilizationTemplatesSelectableList)

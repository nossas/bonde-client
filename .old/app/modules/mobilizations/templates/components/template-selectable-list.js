import React, { PropTypes } from 'react'
import classnames from 'classnames'

import { SelectableList } from '../../../../components/SelectableList'
import { FilterableSearchBar } from '../../../../components/FilterableSearchBar'


const TemplateSelectableList = props => {

  const {
    templates,
    filterableTemplates,
    setSelectedIndex,
    selectedIndex,
    handleSelectItem
  } = props

  const item = filterableTemplates.filter(item => item.id === selectedIndex)[0]

  return (
    <div className='mobilization-templates-selectable-list'>
      <FilterableSearchBar list={templates} />

      <div className='bg-white rounded-bottom' style={{ padding: '1.6rem 2rem' }}>
        <SelectableList
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          list={filterableTemplates}
          emptyListText='Não existe nenhum template com esse nome'
        />
        <button
          disabled={!item}
          style={{ marginTop: '1.6rem' }}
          onClick={() => handleSelectItem(item)}
          className={classnames(
            'btn h3 col-12 white p2 rounded',
            !item ? 'bg-gray95' : 'bg-pagenta'
          )}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

TemplateSelectableList.propTypes = {
  templates: PropTypes.array.isRequired,
  filterableTemplates: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired
}

export default TemplateSelectableList

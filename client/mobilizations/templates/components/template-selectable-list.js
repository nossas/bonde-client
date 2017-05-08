import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames'

// Global module dependencies
import SelectableList from '~components/selectable-list'
import FilterableSearchBar from '~components/filterable-search-bar'

const btnStyle = {
  width: '100%'
}

const TemplateSelectableList = props => {
  const {
    templates,
    filterableTemplates,
    setSelectedIndex,
    selectedIndex,
    handleSelectItem,
    handleGoBack
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
        <div className='flex flex-wrap' style={{ marginTop: '1.6rem' }}>
          {handleGoBack !== undefined ? (
            <div className='col-4'>
              <button
                style={btnStyle}
                onClick={() => handleGoBack()}
                className={classnames('btn h3 white p2 rounded bg-gray')}
              >
                Voltar
              </button>
            </div>
          ) : undefined}
          <div className={classnames(!handleGoBack ? 'col-12' : 'col-4 pl1')}>
            <button
              style={btnStyle}
              disabled={!item}
              onClick={() => handleSelectItem(item)}
              className={classnames(
                'btn h3 white p2 rounded',
                !item ? 'bg-gray95' : 'bg-pagenta'
              )}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

TemplateSelectableList.propTypes = {
  templates: PropTypes.array.isRequired,
  filterableTemplates: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func
}

export default TemplateSelectableList

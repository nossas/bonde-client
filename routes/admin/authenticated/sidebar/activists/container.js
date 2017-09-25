import React, { Component } from 'react'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import { Loading } from '~client/components/await'
import Select from 'react-select-plus'

import FilterForm from './component/filter-form'
import ActivistDetailHOC from './component/detail'

if (require('exenv').canUseDOM) require('./styles.scss')
var styles = require('exenv').canUseDOM ? require('./container.scss') : {}


const QueryForm = ({
  query,
  onQueryChange,
  daysAgo,
  onChangeDaysAgo,
  onSubmit,
  label,
  buttonText,
  name,
  communityId
}) => (
  <form
    className={`${styles.queryForm} pr4 pl3 border-box flex flex-wrap`}
    onSubmit={e => {
      e.preventDefault()
      onSubmit()
    }}
  >
    <div className={`${styles.formGroup} ${styles.groupTag} col-10`}>
      <i className={`fa fa-search ${styles.icon}`} aria-hidden='true' />
      <FilterForm
        name={name}
        className={styles.select}
        communityId={communityId}
        query={query}
        placeholder={label}
        onChange={onQueryChange}
      />
    </div>
    <div className={`${styles.formGroup} ${styles.groupDate} col-2`}>
      <i className={`fa fa-calendar-o ${styles.icon}`} aria-hidden='true' />
      <Select
        simplevalue
        className={styles.select}
        onChange={({ value }) => onChangeDaysAgo(value)}
        value={daysAgo}
        options={[
          { value: 1, label: 'Hoje' },
          { value: 7, label: 'Na última semana' },
          { value: 15, label: 'Nos últimos 15 dias' },
          { value: 30, label: 'Nos últimos 30 dias' },
          { value: 90, label: 'Nos últimos 3 meses' },
          { value: 365, label: 'No último ano' },
          { value: 0, label: 'Sempre' }
        ]}
      />
    </div>
  </form>
)

const Pagination = ({
  indexPage,
  lastPage,
  onPreviousPage,
  onNextPage
}) => {
  const handleClick = (handle) => (e) => {
    e.preventDefault()
    handle()
  }
  return (
    <div className={styles.pagination}>
      <button
        className={styles.buttonLeft}
        disabled={indexPage < 2}
        onClick={handleClick(onPreviousPage)}
      />
      <div className={styles.paginationCount}>
        {indexPage} de {lastPage}
      </div>
      <button
        className={styles.buttonRight}
        disabled={indexPage === lastPage}
        onClick={handleClick(onNextPage)}
      />
    </div>
  )
}

const Row = ({ obj, onSelectRow, onClickRow, isSelected, isActive }) => (
  <div className={`${styles.row} ${isActive ? styles.active : ''}`}>
    <input
      type='checkbox'
      checked={isSelected}
      onChange={() => onSelectRow(obj.id)}
    />
    <div className={`${styles.cell} ${styles.cellName} py2`} onClick={() => onClickRow(obj)}>
      {obj.name}
    </div>
    <div className={`${styles.cell} py2`} onClick={() => onClickRow(obj)}>
      {obj.email}
    </div>
  </div>
)

const Detail = ActivistDetailHOC(
  ({ obj, onClose, mobilizations, tags }) => (
    <div className={styles.detail}>
      <div className={styles.title}>
        <span className={styles.h1}>Perfil selecionado</span>
        <i
          className={`${styles.closeButton}`}
          aria-hidden='true'
          onClick={() => onClose(obj)}
        />
      </div>
      <div className={styles.detailContent}>
        <h3 className='h3'>{obj.name}</h3>

        <div className={styles.detailGroup}>
          <label>Email</label>
          <div className={styles.detailValue}>{obj.email}</div>
        </div>

        <div className={styles.detailGroup}>
          <label>Mobilizações</label>
          <ul className={styles.detailValueList}>
            {mobilizations.map((mob, i) => (
              <li key={`mob${i}`}>{mob.name}</li>
            ))}
          </ul>
        </div>

        <div className={styles.detailGroup}>
          <label>Etiquetas</label>
          <ul className={styles.detailValueList}>
            {tags.map((tag, i) => (
              <li className={styles.tagDeletable} key={`tag${i}`}>{tag.tagCompleteName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
)

class Container extends Component {
  constructor (props) {
    super(props)
    this.state = { item: null }
  }

  onClickRow (item) {
    if (this.state.item === item) {
      this.setState({ item: null })
    } else {
      this.setState({ item })
    }
  }

  render () {
    const { data, loading, totalCount } = this.props
    const {
      selected,
      onSelectAll,
      onRemoveAll,
      selecting,
      communityId
    } = this.props
    const isSelectedAll = (
      selected.length > 0 && selected.length === totalCount
    )

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title='Base de usuários' className={styles.pageMenu} />
        <QueryForm
          name='q'
          label='Filtre por mobilizações ou formulários'
          onSubmit={() => this.props.fetch(true)}
          query={this.props.query}
          onQueryChange={(q) => {
            this.props.onChangeQuery(q)
              .then(() => {
                this.props.fetch(true)
              })
          }}
          daysAgo={this.props.daysAgo}
          onChangeDaysAgo={(days) => {
            this.props.onChangeDaysAgo(days)
              .then(() => {
                this.props.fetch(true)
              })
          }}
          communityId={communityId}
        />

        <SettingsPageContentLayout
          className={styles.pageContent}
          wrapClassName='col-12'
          overflow={selecting || loading ? 'hidden' : 'auto'}
        >
          <div className={`clearfix ${!this.state.item ? styles.contentContainerCenter : ''}`}>
            <div className='col relative'>
              <div className={`${styles.title} clearfix`}>
                {totalCount <= 0 && (
                  <div className={`${styles.h1} mx3`}>
                    Ops! Ninguém com esse filtro :(
                  </div>
                )}
                {totalCount > 0 && (
                  <input
                    id='selectAllId'
                    type='checkbox'
                    disabled={totalCount === 0}
                    checked={isSelectedAll}
                    onClick={(evt) => {
                      if (isSelectedAll) onRemoveAll()
                      else onSelectAll()
                    }}
                  />
                )}
                {totalCount > 0 && (
                  <div className={styles.h1}>
                    {totalCount} pessoas
                  </div>
                )}
              </div>

              <div className={styles.tableContainer}>
                <div className={styles.table}>
                  {data.map(d => (
                    <Row
                      key={`row-${d.id}`}
                      obj={d}
                      isSelected={selected.indexOf(d.id) !== -1}
                      isActive={this.state.item === d}
                      onSelectRow={this.props.onSelectRow}
                      onClickRow={this.onClickRow.bind(this)}
                    />
                  ))}
                </div>
              </div>

              {totalCount > 0 && (
                <Pagination
                  indexPage={this.props.indexPage}
                  lastPage={this.props.lastPage}
                  onPreviousPage={this.props.onPreviousPage}
                  onNextPage={this.props.onNextPage}
                />
              )}

              {(selecting || loading) && (
                <Loading
                  className={!this.state.item
                    ? styles.loadingActivists
                    : styles.loadingActivistsWithProfile
                  }
                  backgroundColor='rgba(255, 255, 255, .6)'
                  loaderColor='#AFAFAF'
                />
              )}
            </div>

            {this.state.item && (
              <Detail
                communityId={this.props.communityId}
                activistId={this.state.item.id}
                obj={this.state.item}
                onClose={this.onClickRow.bind(this)}
              />
            )}
          </div>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

export default Container

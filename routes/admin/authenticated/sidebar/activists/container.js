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
    <div className='pagination clearfix mx-auto'>
      <div className='col col-1'>
        <button
          disabled={indexPage < 2}
          onClick={handleClick(onPreviousPage)}
        >
          <i className='fa fa-arrow-left' aria-hidden='true' />
        </button>
      </div>
      <div className='col col-10'>
        <p>{indexPage} / {lastPage}</p>
      </div>
      <div className='col col-1'>
        <button
          disabled={indexPage === lastPage}
          onClick={handleClick(onNextPage)}
        >
          <i className='fa fa-arrow-right' aria-hidden='true' />
        </button>
      </div>
    </div>
  )
}

const Row = ({ obj, onSelectRow, onClickRow, isSelected, isActived }) => (
  <div className={`${styles.row} clearfix mx-auto px2${isActived ? ' active' : ''}`}>
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
    <div className='detail col col-4 pl3' style={{ width: 'calc(100vw - 866px - 2rem)' }}>
      <div className='col col-12 title py2'>
        <span className={styles.h1}>Perfil selecionado</span>
        <i
          className='fa fa-close'
          aria-hidden='true'
          onClick={() => onClose(obj)}
        />
      </div>
      <div className='col col-12 bg-white py1 px2'>
        <h3>{obj.name}</h3>
        <div>
          <div>
            <label>E-mail</label>
            <p>{obj.email}</p>
          </div>
          <div>
            <label>Mobilizações</label>
            <ul>
              {mobilizations.map((mob, i) => (
                <li key={`mob${i}`}>{mob.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <label>Etiquetas</label>
            <ul className={styles.tags}>
              {tags.map((tag, i) => (
                <li className={styles.tag} key={`tag${i}`}>{tag.tagCompleteName}</li>
              ))}
            </ul>
          </div>
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

        <SettingsPageContentLayout className={styles.pageContent} wrapClassName='col-12'>
          <div className={`${styles.contentContainer} clearfix`}>
            <div className='col'>
              <div className='title clearfix p2'>
                <div className='col col-1'>
                  <input
                    id='selectAllId'
                    type='checkbox'
                    disabled={totalCount === 0}
                    checked={isSelectedAll}
                    onClick={(evt) => {
                      if (isSelectedAll) {
                        onRemoveAll()
                      } else {
                        onSelectAll()
                      }
                    }}
                  />
                </div>
                <div className={styles.h1}>
                  {totalCount} pessoas
                </div>
              </div>

              {(selecting || loading) && <Loading />}

              <div className={styles.tableContainer}>
                <div className={styles.table}>
                  {data.map(d => (
                    <Row
                      key={`row-${d.id}`}
                      obj={d}
                      isSelected={selected.indexOf(d.id) !== -1}
                      isActived={this.state.item === d}
                      onSelectRow={this.props.onSelectRow}
                      onClickRow={this.onClickRow.bind(this)}
                    />
                  ))}
                </div>
              </div>

              <Pagination
                indexPage={this.props.indexPage}
                lastPage={this.props.lastPage}
                onPreviousPage={this.props.onPreviousPage}
                onNextPage={this.props.onNextPage}
              />
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

import React from 'react'
import { withApollo } from 'react-apollo'
import { List } from 'immutable'

export const ListableHOC = ({
  // [gql]: Query carregamento dos dados.
  query,
  // [object | function]: Parametros utilizados na query caso exista. Se
  // função recebe `ownProps` e deve retornar um `object`.
  queryParams,
  // [integer]: Linhas por página
  limit,
  // [string]: Nome da query utilizada. É usado para mapear as propriedades
  // do componente envovlido.
  queryName,
  parse,
  handleError
}) => (WrappedComponent) => {
  class PP extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        loading: false,
        data: [],
        totalCount: 0,
        page: 0
      }
    }

    getPaginationParams () {
      return {
        first: limit,
        offset: this.state.page * limit
      }
    }

    componentDidMount () {
      this.fetch()
    }

    fetch (resetPage) {
      const page = resetPage ? 0 : this.state.page
      const params = { first: limit, offset: page }
      this.setState({ loading: true })

      return this.props.client.query({
        query,
        variables: {
          ...params,
          ...queryParams(this.props)
        }
      }).then(({ data }) => {
        const all = data[queryName] ? data[queryName].nodes : []
        this.setState({
          page,
          loading: data.loading,
          data: all.map(parse),
          totalCount: data[queryName] ? data[queryName].totalCount : 0
        })
        return Promise.resolve()
      }).catch((err) => {
        this.setState({ loading: false })
        const handle = handleError || this.props.listableHandleError
        handle(err)
        return Promise.reject(err)
      })
    }

    handleNextPage () {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetch()
          .catch(err => {
            this.setState({ page: this.state.page - 1, err })
          })
      })
    }

    handlePreviousPage () {
      if (this.state.page > 0) {
        this.setState({ page: this.state.page - 1, action: 'previous' }, () => {
          this.fetch()
            .catch(err => {
              this.setState({ page: this.state.page + 1, err })
            })
        })
      }
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          // Fetching
          fetch={this.fetch.bind(this)}
          loading={this.state.loading}
          data={this.state.data}
          totalCount={this.state.totalCount}
          // Pagination
          indexPage={(this.state.page + 1)}
          lastPage={(parseInt(this.state.totalCount / limit) + 1)}
          onNextPage={this.handleNextPage.bind(this)}
          onPreviousPage={this.handlePreviousPage.bind(this)}
        />
      )
    }
  }

  return withApollo(PP)
}

export const SelectableHOC = ({
  // [gql]: Query carregamento dos dados.
  query,
  // [object | function]: Parametros utilizados na query caso exista. Se
  // função recebe `ownProps` e deve retornar um `object`.
  queryParams,
  queryName,
  parse,
  handleError
}) => (WrappedComponent) => {
  class PP extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        selected: [],
        loading: false
      }
    }

    handleSelectAll () {
      this.setState({ loading: true })
      this.props.client.query({
        query,
        variables: typeof queryParams === 'function'
          ? queryParams(this.props) : queryParams
      }).then(({ data }) => {
        const selected = List(this.state.selected)
          .merge(List(data[queryName].nodes.map(parse)))
          .toArray()
        this.setState({ selected, loading: false })
      }).catch((err) => {
        this.setState({ loading: false })
        const handle = handleError || this.props.selectableHandleError
        handle(err)
      })
    }

    handleSelectRow (id) {
      if (this.state.selected.indexOf(id) !== -1) {
        this.setState({
          selected: this.state.selected.filter(sid => sid !== id)
        })
      } else {
        this.setState({
          selected: [...this.state.selected, id]
        })
      }
    }

    handleRemoveAll () {
      this.setState({ selected: [] })
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          selected={this.state.selected}
          onSelectAll={this.handleSelectAll.bind(this)}
          onRemoveAll={this.handleRemoveAll.bind(this)}
          onSelectRow={this.handleSelectRow.bind(this)}
          selecting={this.state.loading}
        />
      )
    }
  }

  return withApollo(PP)
}

export const FilterableHOC = () => (WrappedComponent) => {
  class PP extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        query: '',
        daysAgo: 0
      }
    }

    onChangeQuery (q) {
      return new Promise((resolve, reject) => {
        if (this.state.query !== q) {
          this.setState({ query: q }, resolve)
        }
      })
    }

    onChangeDaysAgo (days) {
      return new Promise((resolve, reject) => {
        if (this.state.daysAgo !== days) {
          this.setState({ daysAgo: days }, resolve)
        }
      })
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          query={this.state.query}
          daysAgo={this.state.daysAgo}
          onChangeQuery={this.onChangeQuery.bind(this)}
          onChangeDaysAgo={this.onChangeDaysAgo.bind(this)}
        />
      )
    }
  }

  return PP
}

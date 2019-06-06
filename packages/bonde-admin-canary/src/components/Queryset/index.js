import React from 'react'
import { object, number, bool} from 'prop-types'
import { Query } from 'react-apollo'
// TODO: import only configure queryset to observable
import { store } from 'services/redux' 
import * as actions from './redux/actions'
import QueryObject from './QueryObject'

// Queryset: componento para realizar o fetch dos dados
// que implementa as seguintes funcionalidades
// - Paginação **TODO**
// - Filter

class Queryset extends React.Component {

  constructor (props) {
    super(props)
    if (props.observable) {
      this.queryObject = new QueryObject(props.query)
    }
  }

  componentDidMount () {
    // Register query on ObservableQueryset
    if (this.props.observable) {
      store.dispatch(actions.register(
        this.queryObject.name
      )) 
    }
  }

  state = {
    offset: 0,
    limit: this.props.limit,
    pageIndex: 0,
    filter: this.props.filter
  }

  handleChangeFilter (filter, refetch) {
    const offset = 0
    this.setState({ offset, page: 1, filter })

    refetch({ ...filter })
  }

  handleChangePage (pageIndex, fetchMore) {
    const offset = pageIndex * this.state.limit
    this.setState({ pageIndex, offset })

    fetchMore({
      variables: { offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        
        return Object.assign({}, prev, {
          data: fetchMoreResult.data
        })
      }
    })
  }

  render () {
    return (
      <Query
        query={this.props.query}
        variables={{
          offset: this.state.offset,
          limit: this.state.limit,
          ...this.state.filter
        }}
        notifyOnNetworkStatusChange={this.props.observable}
      >
        {({ loading, data, refetch, fetchMore, networkStatus }) => {
          if (this.props.observable && networkStatus === 7) {
            store.dispatch(actions.done({
              queryName: this.queryObject.name,
              length: data[this.queryObject.selector].totalCount
            }))
          }
          
          return this.props.children({
            data,
            loading,
            filter: this.state.filter,
            onChangeFilter: f => this.handleChangeFilter(f, refetch),
            pageIndex: this.state.pageIndex,
            onChangePage: p => this.handleChangePage(p, fetchMore)
          })
        }}
      </Query>
    )
  }
}

Queryset.propTypes = {
  query: object.isRequired,
  limit: number,
  filter: object,
  // Query should return totalCount when this prop is true
  observable: bool
}

Queryset.defaultProps = {
  filter: {},
  observable: false
}

export { default as reducer } from './redux/reducers'

export default Queryset

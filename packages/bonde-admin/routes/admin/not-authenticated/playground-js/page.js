import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

const ActivistsList = gql`
  query ActivistsList {
    allActivists {
      edges {
        node {
          name
        }
      }
    }
  }
`

const Styles = {
  width: '500px',
  heigth: '150px',
  backgroundColor: '#fff',
  padding: '10px'
}

class Page extends Component {
  render () {
    const { data: { loading, error, allActivists } } = this.props

    return (
      <div style={Styles}>
        {loading && <p>Carregando ativistas</p>}
        {error && <p>{error.message}</p>}
        {allActivists && (
          <ul>
            {allActivists.edges.map(a => <li>{a.node.name}</li>)}
          </ul>
        )}
      </div>
    )
  }
}

const PageWithData = graphql(ActivistsList)(Page)

export default PageWithData

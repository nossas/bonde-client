class QueryObject {
  constructor (query) {
    // Take a first query name to register
    // TODO: understand better react-apollo queries
    const definition = query.definitions['0']

    this.name = definition.name.value
    this.selector = definition
      .selectionSet
      .selections['0']
      .name
      .value
  }
}

export default QueryObject

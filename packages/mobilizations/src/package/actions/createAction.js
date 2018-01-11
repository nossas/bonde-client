export const createNamedWrapperAction = (actionFunction, reducerName) => {
  if (typeof actionFunction !== 'function') {
    throw Error('actionFunction should be a function')
  }
  const action = actionFunction()
  return (payload) => ({ ...action, name: reducerName, payload })
}

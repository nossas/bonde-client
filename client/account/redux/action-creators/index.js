export { default as load } from './load'
export { default as login } from './login'
export { default as logout } from './logout'

// // redux-form action
// export const register = user => (dispatch, getState, request) => {
//   return request
//     .post('/users', { user })
//     .then(({ status, data }) => {
//       if (status === 200 && data.errors) {
//         return Promise.reject({ ...data.errors })
//       } else if (status === 201) {
//         return Promise.resolve()
//       }
//     })
//     .catch(error => Promise.reject(error))
// }
//
// export const edit = ({ id, ...user }) => (dispatch, getState, request) => {
//   const headers = { ...getState().auth.credentials }
//   return request
//     .put(`/users/${id}`, { user }, { headers })
//     .then(({ status, data }) => {
//       if (status === 200) {
//         // update reducers
//         dispatch({ type: t.UPDATE, user: data })
//         return Promise.resolve()
//       }
//       return Promise.reject({ _error: `Response code ${status}` })
//     })
//     .catch(error => Promise.reject(error))
// }

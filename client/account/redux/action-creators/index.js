export { default as load } from './load'
export { default as login } from './login'
export { default as logout } from './logout'
export { default as asyncUpdateUser } from './async-update-user'

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

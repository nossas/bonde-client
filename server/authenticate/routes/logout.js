export default (req) => new Promise((resolve) => {
  req.session.destroy(() => {
    req.session = null
    return resolve({})
  })
})

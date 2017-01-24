export default req => {
  const auth = { ...req.body }
  req.session.auth = auth
  return Promise.resolve(auth)
}

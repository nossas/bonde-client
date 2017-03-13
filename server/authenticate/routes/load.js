export default req => Promise.resolve(req.session.auth || {})

export default function login (req) {
  const auth = { ...req.body }
  req.session.auth = auth
  return Promise.resolve(auth)
}

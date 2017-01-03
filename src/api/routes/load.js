export default function load (req) {
  return Promise.resolve(req.session.auth || null)
}

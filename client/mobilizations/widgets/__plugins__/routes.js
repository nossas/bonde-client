import matchRoutes from './match/routes'
import pressureRoutes from './pressure/routes'
import formRoutes from './form/routes'
import donationRoutes from './donation/routes'

export default () => [
  matchRoutes(),
  pressureRoutes(),
  formRoutes(),
  donationRoutes()
]

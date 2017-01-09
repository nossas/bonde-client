import React from 'react'
import { Route } from 'react-router'

import { BlockCreate } from '../../mobilizations/blocks/pages'

const BlocksRoutes = () => [
  <Route path='/blocks/create' component={BlockCreate} />
]

export default BlocksRoutes

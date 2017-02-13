// Current module dependencies
import { createAction } from './create-action'
import c from '../constants'

export const setEditionMode = edition => createAction(c.BLOCK_EDITION_MODE, edition)

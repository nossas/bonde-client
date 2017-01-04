import { createAction } from './create-action'
import c from '../../../mobilizations/blocks/constants'

export const setEditionMode = edition => createAction(c.BLOCK_EDITION_MODE, edition)

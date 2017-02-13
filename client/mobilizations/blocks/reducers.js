import c from '../../mobilizations/blocks/constants'

export const initialState = {
  loaded: false,
  loading: false,
  requesting: false,
  data: [],
  error: undefined,
  uploadingBackgroundImage: false,
  uploadedBackgroundImage: undefined,
  editionMode: false
}

//
// TODO: Maybe split these reducers into separated files
// to turns more explicit what is its responsibility and let
// the code more cleaner
//
const BlockReducers = (state = initialState, action) => {
  let data

  switch (action.type) {
    //
    // Async Actions
    //
    // @suggestion: Maybe this block of code turns
    // into a file called `async-block-fetch-reducer`?
    case c.REQUEST_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: false, loading: true }
    case c.SUCCESS_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, loading: false, data: action.payload }
    case c.FAILURE_ASYNC_BLOCK_FETCH:
      return { ...state, loaded: true, loading: false, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_CREATE:
      return { ...state, requesting: true }
    case c.SUCCESS_ASYNC_BLOCK_CREATE:
      return { ...state, requesting: false, data: state.data.concat([action.payload]) }
    case c.FAILURE_ASYNC_BLOCK_CREATE:
      return { ...state, requesting: false, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_UPDATE:
      return { ...state, requesting: true }
    case c.SUCCESS_ASYNC_BLOCK_UPDATE:
      data = state.data.map(block => block.id === action.payload.id ? action.payload : block)
      return { ...state, requesting: false, data }
    case c.FAILURE_ASYNC_BLOCK_UPDATE:
      return { ...state, requesting: false, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: false }
    case c.SUCCESS_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: true, data: action.payload }
    case c.FAILURE_ASYNC_BLOCK_SELECT:
      return { ...state, loaded: true, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_DESTROY:
      return { ...state, requesting: true }
    case c.SUCCESS_ASYNC_BLOCK_DESTROY:
      data = state.data.filter(block => action.payload.id !== block.id)
      return { ...state, requesting: false, data }
    case c.FAILURE_ASYNC_BLOCK_DESTROY:
      return { ...state, requesting: false, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_MOVE_UP:
      return { ...state, requesting: true }
    case c.SUCCESS_ASYNC_BLOCK_MOVE_UP:
      data = state.data.map((block, index) => {
        if (index + 1 < state.data.length && state.data[index + 1].id === action.payload.id) {
          return action.payload
        } else if (block.id === action.payload.id) {
          return state.data[index - 1]
        }
        return block
      })
      return { ...state, requesting: false, data }
    case c.FAILURE_ASYNC_BLOCK_MOVE_UP:
      return { ...state, requesting: false, error: action.payload }

    case c.REQUEST_ASYNC_BLOCK_MOVE_DOWN:
      return { ...state, requesting: true }
    case c.SUCCESS_ASYNC_BLOCK_MOVE_DOWN:
      data = state.data.map((block, index) => {
        if (index > 0 && state.data[index - 1].id === action.payload.id) {
          return action.payload
        } else if (block.id === action.payload.id) {
          return state.data[index + 1]
        }
        return block
      })
      return { ...state, requesting: false, data }
    case c.FAILURE_ASYNC_BLOCK_MOVE_DOWN:
      return { ...state, requesting: false, error: action.payload }

    //
    // Sync Actions
    //
    case c.BLOCK_SELECTED_LAYOUT:
      return { ...state, selectedLayout: action.layout }

    case c.BLOCK_BACKGROUND_IMAGE_UPLOADING:
      return { ...state, uploadingBackgroundImage: action.uploading }
    case c.BLOCK_BACKGROUND_IMAGE_UPLOADED:
      return { ...state, uploadedBackgroundImage: action.image }

    case c.BLOCK_EDITION_MODE:
      return { ...state, editionMode: action.payload }

    default:
      return state
  }
}

export default BlockReducers

import request from 'superagent'

//
// Constants
//
export const REQUEST_FETCH_BLOCKS = 'REQUEST_FETCH_BLOCKS'
export const SUCCESS_FETCH_BLOCKS = 'SUCCESS_FETCH_BLOCKS'
export const FAILURE_FETCH_BLOCKS = 'FAILURE_FETCH_BLOCKS'

export const SET_SELECTED_LAYOUT = 'SET_SELECTED_LAYOUT'

export const PROGRESS_UPLOAD_BLOCK_BG_IMAGE = 'PROGRESS_UPLOAD_BLOCK_BG_IMAGE'
export const FINISH_UPLOAD_BLOCK_BG_IMAGE = 'FINISH_UPLOAD_BLOCK_BG_IMAGE'
export const SET_UPLOADED_BLOCK_BACKGROUND_IMAGE = 'SET_UPLOADED_BLOCK_BACKGROUND_IMAGE'

export const EDIT_BLOCK = 'EDIT_BLOCK'
export const REMOVE_BLOCK = 'REMOVE_BLOCK'
export const MOVE_BLOCK_UP = 'MOVE_BLOCK_UP'
export const MOVE_BLOCK_DOWN = 'MOVE_BLOCK_DOWN'

//
// Actions
// TODO:
//    Refactoring actions to use axios thunk middleware extra argument.
//    Use of `superagent` package is deprecated.
//
export function fetchBlocks(params) {
  return {
    types: [REQUEST_FETCH_BLOCKS, SUCCESS_FETCH_BLOCKS, FAILURE_FETCH_BLOCKS],
    promise: () => {
      return new Promise((resolve, reject) => {
        request
          .get(`${process.env.API_URL}/mobilizations/${options.mobilization_id}/blocks`)
          .end((err, res) => {
            if (err || !res.ok) {
              reject(err || res.body)
            } else {
              resolve(res.body)
            }
          })
      })
    }
  }
}

export const setSelectedLayout = layout => ({ type: SET_SELECTED_LAYOUT, layout })

export const progressUploadBlockBackgroundImage = () => ({
  type: PROGRESS_UPLOAD_BLOCK_BG_IMAGE
})
export const finishUploadBlockBackgroundImage = () => ({
  type: FINISH_UPLOAD_BLOCK_BG_IMAGE
})
export const setUploadedBlockBackgroundImage = image => ({
  type: SET_UPLOADED_BLOCK_BACKGROUND_IMAGE,
  image
})

// TODO: Refatorar funções abaixo
export function addBlock(params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks`, {
      method: 'post',
      data: { block: params.block },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        params.router.transitionTo(Paths.editMobilization(params.mobilization_id) + '?newBlock=true')
      }
    })
  }
}

export function editBlock(params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${params.block_id}`, {
      method: 'put',
      data: { block: params.block },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: EDIT_BLOCK,
          block: data
        })
      }
    })
  }
}

export function removeBlock(params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${params.block_id}`, {
      method: 'delete',
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: REMOVE_BLOCK,
          block: data
        })
      }
    })
  }
}

export function moveBlockUp(params) {
  const { block, blocks } = params
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${block.id}`, {
      method: 'put',
      data: {
        block: {
          position: blocks.data[blocks.data.indexOf(block) - 1].position
        }
      },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: MOVE_BLOCK_UP,
          block: data
        })
      }
    })
  }
}

export function moveBlockDown(params) {
  const { block, blocks } = params
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${block.id}`, {
      method: 'put',
      data: {
        block: {
          position: blocks.data[blocks.data.indexOf(block) + 1].position
        }
      },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: MOVE_BLOCK_DOWN,
          block: data
        })
      }
    })
  }
}

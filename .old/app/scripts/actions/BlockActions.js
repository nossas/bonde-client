import { FETCH_BLOCKS, EDIT_BLOCK, REMOVE_BLOCK, MOVE_BLOCK_UP, MOVE_BLOCK_DOWN } from '../constants/ActionTypes'
import * as Paths from '../Paths'
import $ from 'jquery'

export function fetchBlocks(params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks`, {
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: FETCH_BLOCKS,
          blocks: data
        })
      }
    })
  }
}

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

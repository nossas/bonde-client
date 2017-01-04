import superagent from 'superagent'

const REQUEST_FETCH_BLOCKS = 'REQUEST_FETCH_BLOCKS'
const SUCCESS_FETCH_BLOCKS = 'SUCCESS_FETCH_BLOCKS'
const FAILURE_FETCH_BLOCKS = 'FAILURE_FETCH_BLOCKS'

const REQUEST_ADD_BLOCK = 'REQUEST_ADD_BLOCK'
const SUCCESS_ADD_BLOCK = 'SUCCESS_ADD_BLOCK'
const FAILURE_ADD_BLOCK = 'FAILURE_ADD_BLOCK'

const REQUEST_EDIT_BLOCK = 'REQUEST_EDIT_BLOCK'
const SUCCESS_EDIT_BLOCK = 'SUCCESS_EDIT_BLOCK'
const FAILURE_EDIT_BLOCK = 'FAILURE_EDIT_BLOCK'

const REQUEST_FIND_BLOCKS = 'REQUEST_FIND_BLOCKS'
const SUCCESS_FIND_BLOCKS = 'SUCCESS_FIND_BLOCKS'
const FAILURE_FIND_BLOCKS = 'FAILURE_FIND_BLOCKS'

const EDIT_BLOCK = 'EDIT_BLOCK'
const REMOVE_BLOCK = 'REMOVE_BLOCK'
const MOVE_BLOCK_UP = 'MOVE_BLOCK_UP'
const MOVE_BLOCK_DOWN = 'MOVE_BLOCK_DOWN'

const initialState = {
  loaded: false,
  data: []
}

export default function blocks(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH_BLOCKS:
      return {...state, loaded: false}
    case SUCCESS_FETCH_BLOCKS:
      return {...state, loaded: true, data: action.result }
    case FAILURE_FETCH_BLOCKS:
      return {...state, loaded: true}
    case REQUEST_FIND_BLOCKS:
      return {...state, loaded: false}
    case SUCCESS_FIND_BLOCKS:
      return {...state, loaded: true, data: action.result }
    case FAILURE_FIND_BLOCKS:
      return {...state, loaded: true}
    case REQUEST_EDIT_BLOCK:
      return {...state}
    case SUCCESS_EDIT_BLOCK:
      return {...state,
        data: state.data.map(
          block => block.id === action.result.id ? action.result : block
        )
      }
    case FAILURE_EDIT_BLOCK:
      return {...state}
    case EDIT_BLOCK:
      return {...state,
        data: state.data.map(
          block => block.id === action.block.id ? action.block : block
        )
      }
    case REQUEST_ADD_BLOCK:
      return {...state, loaded: false}
    case SUCCESS_ADD_BLOCK:
      return {...state, loaded: true, data: state.data.concat([action.result])}
    case FAILURE_ADD_BLOCK:
      return {...state, loaded: true}
    case MOVE_BLOCK_UP:
      return {...state,
        data: state.data.map((block, index) => {
          if (index + 1 < state.data.length && state.data[index + 1].id === action.block.id) {
            return action.block
          } else if (block.id === action.block.id) {
            return state.data[index - 1]
          }
          return block
        })
      }
    case MOVE_BLOCK_DOWN:
      return {...state,
        data: state.data.map((block, index) => {
          if (index > 0 && state.data[index - 1].id === action.block.id) {
            return action.block
          } else if (block.id === action.block.id) {
            return state.data[index + 1]
          }
          return block
        })
      }
    case REMOVE_BLOCK:
      return {...state,
        data: state.data.filter(block => action.block.id !== block.id)
      }
    default:
      return state
  }
}

export function isBlocksLoaded(globalState) {
  return globalState.blocks.loaded
}

export function fetchBlocks(options) {
  return {
    types: [REQUEST_FETCH_BLOCKS, SUCCESS_FETCH_BLOCKS, FAILURE_FETCH_BLOCKS],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent.get(`${process.env.API_URL}/mobilizations/${options.mobilization_id}/blocks`).end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}

export function findBlocks(options) {
  return {
    types: [REQUEST_FIND_BLOCKS, SUCCESS_FIND_BLOCKS, FAILURE_FIND_BLOCKS],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent
        .get(`${process.env.API_URL}/blocks`)
        .send(options)
        .end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}

export function addBlock(params) {
  return {
    types: [REQUEST_ADD_BLOCK, SUCCESS_ADD_BLOCK, FAILURE_ADD_BLOCK],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent
        .post(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks`)
        .set(params.credentials)
        .send({block: params.block})
        .end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}

export function editBlock(params) {
  return {
    types: [REQUEST_EDIT_BLOCK, SUCCESS_EDIT_BLOCK, FAILURE_EDIT_BLOCK],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent
        .put(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${params.id}`)
        .set(params.credentials)
        .send({block: params.block})
        .end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}

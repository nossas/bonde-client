import { expect } from 'chai'
import { fromJS } from 'immutable'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncMoveDown } from '~client/mobrender/redux/action-creators'
import { createAction } from '~client/mobrender/redux/action-creators/create-action'
import * as t from '~client/mobrender/redux/action-types'

import rootReducer from '../mock-reducers/root-reducer'

// Mock axios
const mockAxios = new MockAdapter(axios)
const data = [
  { id: 1, name: 'Lorem', position: 1 },
  { id: 2, name: 'Ipsum', position: 2 },
  { id: 3, name: 'Dolor', position: 3 }
]
const block = {...data[1], position: 3}
mockAxios.onPut(
  `/mobilizations/1/blocks/2`, { block }
).reply(200, block)

// Mock store
const store = configureStore(
  [thunk.withExtraArgument({ api: axios })]
)(fromJS(rootReducer).mergeDeep({
  mobilizations: {
    list: {
      data: [ { id: 1, name: 'Mob' } ],
      currentId: 1
    },
    blocks: { data }
  }
}).toJS())

describe('~client/mobrender/redux/action-creators/async-move-down', () => {
  it('should dispatch actions to move up block', () => {
    const expectedActions = [
      createAction(t.UPDATE_BLOCK_REQUEST),
      createAction(t.UPDATE_BLOCK_SUCCESS, block),
      createAction(t.MOVE_BLOCK_DOWN, block)
    ]
    return store.dispatch(asyncMoveDown(data[1]))
      .then(() => {
        expect(store.getActions().length).to.equal(3)
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])
        expect(store.getActions()[2]).to.deep.equal(expectedActions[2])
      })
  })
})

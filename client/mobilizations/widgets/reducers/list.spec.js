import { expect } from 'chai'

import * as t from '../action-types'
import reducer from './list'
import { createAction } from '../action-creators/create-action'

describe('app/modules/widgets/reducers/list', () => {
  it('should update state widget.exported_at when download report', () => {
    const initialState = {
      data: [{ id: 1, kind: 'form_entry' }]
    }
    const action = createAction(t.EXPORT_DATACLIP_SUCCESS, { widget: { id: 1 } })
    const nextState = reducer(initialState, action)
    expect(nextState).to.have.deep.property('data[0].exported_at')
  })

  it('widget.exported_at state property should be Date type', () => {
    const initialState = {
      data: [{ id: 1, kind: 'form_entry' }]
    }
    const action = createAction(t.EXPORT_DATACLIP_SUCCESS, { widget: { id: 1 } })
    const nextState = reducer(initialState, action)
    expect(nextState.data[0].exported_at).to.be.Date
  })
})

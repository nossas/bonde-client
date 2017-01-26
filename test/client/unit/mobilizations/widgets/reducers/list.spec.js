import { expect } from 'chai'

// Current module dependencies
import * as t from '~mobilizations/widgets/action-types'
import { createAction } from '~mobilizations/widgets/action-creators/create-action'
import reducer from '~mobilizations/widgets/reducers/list'

describe('client/mobilizations/widgets/reducers/list', () => {
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

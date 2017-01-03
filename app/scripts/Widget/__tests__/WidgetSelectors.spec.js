import { expect } from 'chai'

import * as WidgetSelectors from '../WidgetSelectors'

describe('WidgetSelectors', () => {
  context('#getWidget', () => {
    it('should return widget to params url widget_id', () => {
      // Url params in props
      const props = { params: { widget_id: 2 } }
      // Global state loaded
      const state = { widgets: { data: [{ id: 1, kind: 'donation' }, { id: 2, kind: 'form' }] } }
      expect(WidgetSelectors.getWidget(state, props)).to.deep.equal({ id: 2, kind: 'form' })
    })

    it('should return to params url widget_id when widget_id is String', () => {
      // Url params in props
      const props = { params: { widget_id: '2' } }
      // Global state loaded
      const state = { widgets: { data: [{ id: 1, kind: 'donation' }, { id: 2, kind: 'form' }] } }
      expect(WidgetSelectors.getWidget(state, props)).to.deep.equal({ id: 2, kind: 'form' })
    })
  })
})

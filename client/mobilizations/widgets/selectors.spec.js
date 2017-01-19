import { expect } from 'chai'

import * as WidgetSelectors from './selectors'

describe('app/modules/widgets/selectors', () => {
  context('#getWidget', () => {
    const state = {
      widgets: {
        list: {
          data: [
            { id: 1, kind: 'donation' },
            { id: 2, kind: 'form' }
          ]
        }
      }
    }

    it('should return widget to params url widget_id', () => {
      const props = { params: { widget_id: 2 } }
      expect(
        WidgetSelectors.getWidget(state, props)
      ).to.deep.equal({ id: 2, kind: 'form' })
    })

    it('should return to params url widget_id when widget_id is String', () => {
      const props = { params: { widget_id: '2' } }
      expect(
        WidgetSelectors.getWidget(state, props)
      ).to.deep.equal({ id: 2, kind: 'form' })
    })
  })
})

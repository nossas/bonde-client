import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import colorPicker from '../../app/components/ColorPicker/ColorPickerReducer'
import widgets from '../../app/scripts/Widget/reducer'
import matches from '../../app/scripts/Widget/plugins/Match/reducer'
import exportDataClip from '../../app/scripts/reducers/exportDataClip'
import mobilization from '../../app/scripts/Mobilization/MobilizationReducer'
import mobilizationTemplates from '../../app/scripts/Mobilization/plugins/Templates/MobilizationTemplatesReducer'
import selectableList from '../../app/components/SelectableList/SelectableListReducer'
import filterableSearchBar from '../../app/components/FilterableSearchBar/FilterableSearchBarReducer'

import { reducers as blocks } from '../../app/modules/mobilizations/blocks'
import { reducers as auth } from '../../app/scripts/Account'
import { reducers as community } from '../../app/scripts/Community'

export default combineReducers({
  form: formReducer,

  // Need some refact
  mobilization,
  mobilizationTemplates,
  selectableList,
  filterableSearchBar,
  colorPicker,
  widgets,
  matches,
  exportDataClip,

  blocks,
  auth,
  community,
})

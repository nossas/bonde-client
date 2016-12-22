import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import blocks from './../../app/scripts/reducers/blocks'
import blockReducer from '../../app/scripts/Block/BlockReducer'
import colorPicker from '../../app/components/ColorPicker/ColorPickerReducer'
import widgets from './../../app/scripts/Widget/reducer'
import mobilizationEditor from './../../app/scripts/reducers/mobilizationEditor'
/*import organizations from './../../app/scripts/reducers/organizations'*/
import matches from './../../app/scripts/Widget/plugins/Match/reducer'
import exportDataClip from './../../app/scripts/reducers/exportDataClip'
import mobilization from './../../app/scripts/Mobilization/MobilizationReducer'
import mobilizationTemplates from './../../app/scripts/Mobilization/plugins/Templates/MobilizationTemplatesReducer'
import selectableList from './../../app/components/SelectableList/SelectableListReducer'
import filterableSearchBar from './../../app/components/FilterableSearchBar/FilterableSearchBarReducer'

import { reducers as auth } from './../../app/scripts/Account'
import { reducers as community } from './../../app/scripts/Community'

export default combineReducers({
  form: formReducer,
  mobilization,
  mobilizationTemplates,
  selectableList,
  filterableSearchBar,
  blocks,
  blockReducer,
  colorPicker,
  widgets,
  auth,
  mobilizationEditor,
  community,
  matches,
  exportDataClip
})

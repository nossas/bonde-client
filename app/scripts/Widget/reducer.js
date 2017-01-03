import superagent from 'superagent'

import { ADD_MATCH, UPDATE_MATCH, DELETE_MATCH } from './../constants/ActionTypes'
import { EXPORT_DATACLIP_SUCCESS } from './../actions/ExportActions'

import {
  REQUEST_EDIT_WIDGET,
  SUCCESS_EDIT_WIDGET,
  FAILURE_EDIT_WIDGET,

  REQUEST_FETCH_GOOGLE_FONTS,
  SUCCESS_FETCH_GOOGLE_FONTS,
  FAILURE_FETCH_GOOGLE_FONTS,

  TOOLBAR_SET_LINK_OPEN_STRATEGY
} from './actions'
import { REQUEST_FILL_WIDGET, SUCCESS_FILL_WIDGET, FAILURE_FILL_WIDGET } from './actions'

const FETCH_WIDGETS_REQUEST = 'FETCH_WIDGETS_REQUEST'
const FETCH_WIDGETS_SUCCESS = 'FETCH_WIDGETS_SUCCESS'
const FETCH_WIDGETS_FAILURE = 'FETCH_WIDGETS_FAILURE'

const REQUEST_FIND_WIDGETS = 'REQUEST_FIND_WIDGETS'
const SUCCESS_FIND_WIDGETS = 'SUCCESS_FIND_WIDGETS'
const FAILURE_FIND_WIDGETS = 'FAILURE_FIND_WIDGETS'

const EDIT_WIDGET = 'EDIT_WIDGET'
const ADD_FORM_ENTRY = 'ADD_FORM_ENTRY'

const initialState = {
  loaded: false,
  data: [],
  saving: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_WIDGETS_REQUEST:
      return {...state, loaded: false}
    case FETCH_WIDGETS_SUCCESS:
      return {...state, loaded: true, data: action.result }
    case FETCH_WIDGETS_FAILURE:
      return {...state, loaded: true}
    case REQUEST_FIND_WIDGETS:
      return {...state, loaded: false}
    case SUCCESS_FIND_WIDGETS:
      return {...state, loaded: true, data: action.result }
    case FAILURE_FIND_WIDGETS:
      return {...state, loaded: true}
    case REQUEST_EDIT_WIDGET:
      return {
        ...state,
        saving: true
      }
    case REQUEST_FILL_WIDGET:
      return {
        ...state,
        saving: true
      }
    case SUCCESS_EDIT_WIDGET:
      return {
        ...state,
        data: state.data.map(
          widget => widget.id === action.widget.id ? action.widget : widget
        ),
        saving: false
      }
    case SUCCESS_FILL_WIDGET:
      return {
        ...state,
        data: state.data.map(
          widget => widget.id === action.counter.id ? {...widget, ...action.counter, filled: true} : widget
        ),
        saving: false
      }
    case FAILURE_EDIT_WIDGET, FAILURE_FILL_WIDGET:
      return {
        ...state,
        saving: false,
        error: action.error
      }

    case ADD_FORM_ENTRY:
      return {...state,
        data: state.data.map(
          widget => widget.id === action.form_entry.widget_id ? {...widget, form_entries_count: widget.form_entries_count + 1} : widget
        )
      }
    case ADD_MATCH:
      return {
        ...state,
        data: state.data.map(
          widget => {
            if (widget.id === action.match.widget_id) {
              if (!widget.match_list.includes(action.match)) {
                widget.match_list.push(action.match)
              }
            }
            return widget
          }
        )
      }
    case EXPORT_DATACLIP_SUCCESS:
      return {
        ...state,
        data: state.data.map(widget => {
          if (widget.id === action.widget_id) {
            widget.exported_at = new Date()
          }
          return widget
        })
      }
    case UPDATE_MATCH:
      return {
        ...state,
        data: state.data.map(
          widget => {
            if (widget.id === action.match.widget_id) {
              widget.match_list = widget.match_list.map(match => match.id === action.match.id ? action.match : match)
            }
            return widget
          }
        )
      }
    case DELETE_MATCH:
      return {
        ...state,
        data: state.data.map(widget => {
          if (widget.id === parseInt(action.widget_id)) {
            widget.match_list = widget.match_list.filter(match => {
              return !action.deleted_matches.includes(match.id)
            })
          }
          return widget
        })
      }
    case REQUEST_FETCH_GOOGLE_FONTS:
      return { ...state, loaded: false, loading: true }
    case SUCCESS_FETCH_GOOGLE_FONTS:
      return { ...state, loaded: true, loading: false, googleFonts: action.fonts }
    case FAILURE_FETCH_GOOGLE_FONTS:
      return { ...state, loaded: true, loading: false, error: action.error }
    case TOOLBAR_SET_LINK_OPEN_STRATEGY:
      return { ...state, toolbarLinkOpenStrategy: action.strategy }
    default:
      return state
  }
}

export function isWidgetsLoaded (globalState) {
  return globalState.blocks.loaded
}

export function fetchWidgets (options) {
  return {
    types: [FETCH_WIDGETS_REQUEST, FETCH_WIDGETS_SUCCESS, FETCH_WIDGETS_FAILURE],
    promise: function () {
      return new Promise(function (resolve, reject) {
        superagent.get(`${process.env.API_URL}/mobilizations/${options.mobilization_id}/widgets`).end((err, res) => {
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

export function findWidgets (options) {
  return {
    types: [REQUEST_FIND_WIDGETS, SUCCESS_FIND_WIDGETS, FAILURE_FIND_WIDGETS],
    promise: function () {
      return new Promise(function (resolve, reject) {
        superagent.get(`${process.env.API_URL}/widgets`)
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

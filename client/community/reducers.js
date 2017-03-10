import * as t from './action-types'

const initialState = {
  isLoaded: true,
  data: [],
  // @revert To undefined
  data: [
    {
      id: 15,
      name: 'BH 90º',
      city: 'Belo Horizonte - MG',
      mailchimp_api_key: undefined,
      mailchimp_list_id: undefined,
      mailchimp_group_id: undefined,
      image: undefined,
      description: undefined,
      recipient: undefined}
  ],
  currentId: 15
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH:
      return {
        ...state,
        loading: true
      }
    case t.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoaded: true,
        data: action.data
      }
    case t.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        isLoaded: false,
        error: action.error
      }
    case t.ADD:
      return {
        ...state,
        data: [...state.data, action.community]
      }
    case t.EDIT:
      return {
        ...state,
        data: state.data.map(
          c => c.id === action.community.id ? action.community : c
        )
      }
    case t.SELECT:
      return {
        ...state,
        currentId: action.id
      }
    case t.UNSET:
      return {
        ...state,
        currentId: null
      }
    default:
      return state
  }
}

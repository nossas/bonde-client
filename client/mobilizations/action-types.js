const withPrefix = prefix => `mobilizations/${prefix}`

export const ADD = withPrefix('ADD')

export const UPDATE = withPrefix('UPDATE')

export const FETCH = withPrefix('FETCH')

export const LOAD = withPrefix('LOAD')

export const SELECT = withPrefix('SELECT')

export const UNSELECT = withPrefix('UNSELECT')

export const TOGGLE_MENU = withPrefix('TOGGLE_MENU')

export const ASYNC_FILTER_REQUEST = withPrefix('ASYNC_FILTER_REQUEST')
export const ASYNC_FILTER_SUCCESS = withPrefix('ASYNC_FILTER_SUCCESS')
export const ASYNC_FILTER_FAILURE = withPrefix('ASYNC_FILTER_FAILURE')

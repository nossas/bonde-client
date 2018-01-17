import { IntlProvider, addLocaleData } from 'react-intl'
import pt from 'react-intl/locale-data/pt'
import es from 'react-intl/locale-data/es'
import en from 'react-intl/locale-data/en'
import localeData from './locale-data'

addLocaleData([...pt, ...es, ...en])

export const locale = 'pt-BR'
export const messages = localeData[locale] || {}
export const { intl } = new IntlProvider({ locale, messages })
  .getChildContext()

const SET_CURRENT_LOCALE = 'intl/SET_CURRENT_LOCALE'
const initialState = {
  currentLocale: locale,
  defaultLocale: null,
  locales: [],
  messages
}

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_LOCALE:
      return Object.assign({}, state, { currentLocale: action.payload })
    default:
      return state
  }
}

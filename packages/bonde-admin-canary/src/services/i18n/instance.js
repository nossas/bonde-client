import i18next from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    failbackingLng: 'pt-BR',
    fallbackLng: ['pt-BR'],
    // have a common nampespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    debug: process.env.NODE_ENV === 'development',
    react: {
      wait: true
    }
  })

/**
 * i18next instance, use to translate app.
 *
 * Locale path: /public/locales/[LANG]/[NAMESPACE].json
 */
export default i18next

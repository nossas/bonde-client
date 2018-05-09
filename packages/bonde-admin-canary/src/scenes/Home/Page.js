import React from 'react'
import { translate } from '../../services/i18n'

const Page = ({ name, onChangeName, t, i18n }) => {
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      <p>{t('description')}</p>
      <input value={name} onChange={onChangeName} />
      <br />
      <button
        onClick={() => changeLanguage('pt-BR')}
      >
        pt-BR
      </button>
      <button
        onClick={() => changeLanguage('en')}
      >
        en
      </button>
    </div>
  )
}

export default translate('home')(Page)

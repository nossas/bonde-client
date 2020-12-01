import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "bonde-components";

const LocalePanel = ({ changeLanguage }: any) => (
  <>
    <Button onClick={() => changeLanguage('en')}>English</Button>
    <Button onClick={() => changeLanguage('es')}>Spanish</Button>
    <Button onClick={() => changeLanguage('pt-BR')}>Portuguese</Button>
  </>
);

export default () => {
  const { i18n } = useTranslation();

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
  }

  return (
    <LocalePanel changeLanguage={changeLanguage} />
  )
}
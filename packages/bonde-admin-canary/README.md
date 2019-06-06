# Bonde Admin Canary

A partir da demanda exigida pelas estórias acima, criamos um setup inicial para projetos React Web, com intuito de termos um template de aplicação web para uso dentro e fora do ecossistema Bonde.

## Arquitetura

O projeto baseia-se no [Create React App](https://github.com/facebook/create-react-app), uma CLI que trás um start rápido para projetos React Web com algumas configurações básicas.

Para começar a testar, você precisa saber um pouco sobre o [AVA](https://github.com/avajs) um Test Runner que traz muitas vantagens para execução dos seus testes unitários. No momento estamos usando a versão [v0.25.0](https://github.com/avajs/ava/tree/v0.25.0), para tentar manter versões estáveis dentro do template.

Com base na necessidade de manter um desenvolvimento manutenível, sobre demandas que surgem ao longo de um projeto, adotamos um padrão de projeto chamado `Scenes`, você pode saber mais sobre em [How to better organize your react applications](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

Seguindo o padrão de projeto adotado, `Scenes`, criamos alguns serviços necessários dentro dos projetos React no ecossistema Bonde, nesta release estes serviços são controle de sessão, controle de estado da aplicação (estado compartilhado), acesso assíncrono p/ graphql api e mecanismo de tradução.

## Serviços

### services/redux
Serviço utilizado para controlar um estado compartilhado na aplicação.

Dependencias
- [redux](https://redux.js.org/)
- [react-redux](https://github.com/reactjs/react-redux)
```	
import { connect, ProviderRedux, store } from 'services/redux	
```

### services/graphql
Cliente para consumir APIs GraphQL.

Dependencias
- [react-apollo](https://github.com/apollographql/react-apollo)
- [apollo-client](https://github.com/apollographql/apollo-client)
```
import { graphqlApi, ProviderGraphQL } from 'services/graphql'
```

### services/auth
Módulo responsável por controlar acesso e gerenciar a sessão de usuário.

Dependencias
- [react-router](https://github.com/ReactTraining/react-router)
- `services/redux`
- `services/session`
```
import { AuthAPI, PrivateRoute, PublicRoute } from 'services/auth'
```

### services/session
Interface para gerenciamento de escrita e leitura dos dados no localStorage.

Dependencias
- [lowdb](https://github.com/typicode/lowdb)
```
import { db } from 'services/session'
```

### services/i18n
Serviço de internacionalização.

Dependencias
- [i18next](https://www.i18next.com/)
- [react-i18next](https://github.com/i18next/react-i18next)
- [i18next-xhr-backend](https://github.com/i18next/i18next-xhr-backend)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)
```
import { ProviderI18n, i18n, translate } from 'services/i18n'
```
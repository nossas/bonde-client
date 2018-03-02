```js
<Page>
  <Text>Welcome to bonde.org</Text>
</Page>
```


### Page - `menuComponent`


```js
const PageTabMenu = () => (
  <Tab inverted>
    <TabItem active>Informações</TabItem>
    <TabItem>Mobilizadores</TabItem>
    <TabItem>Conta</TabItem>
    <TabItem>Domínios</TabItem>
    <TabItem>Integrações</TabItem>
  </Tab>
);

<Page menuComponent={PageTabMenu}>
  <Text>Welcome to bonde.org</Text>
</Page>
```


### Page - with header


```js
const ModuleTabMenu = () => (
  <Tabs>
    <Tab>Editar</Tab>
    <Tab active>Configurações</Tab>
  </Tabs>
);
const PageTabMenu = () => (
  <Tab inverted>
    <TabItem active>Informações</TabItem>
    <TabItem>Mobilizadores</TabItem>
    <TabItem>Conta</TabItem>
    <TabItem>Domínios</TabItem>
    <TabItem>Integrações</TabItem>
  </Tab>
);

<div>
  <Header pageTitle='Respeita as Mina'>
    <ModuleTabMenu />
  </Header>
  <Page menuComponent={PageTabMenu}>
    <Text>Welcome to bonde.org</Text>
  </Page>
</div>
```

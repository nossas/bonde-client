```js { "props": { "className": "dark" } }
<Dropdown label='Maria Benati' width={190}>
  <DropdownHeader>
    <img src='http://via.placeholder.com/35x35?text=U' alt='User' />
    <span>Maria Benatti</span>
  </DropdownHeader>
  <DropdownItem onClick={() => alert('clicked Perfil')}>
    <Icon name='user' /> Perfil
  </DropdownItem>
  <DropdownItem onClick={() => alert('clicked Sair')}>
    <Icon name='times' /> Sair
  </DropdownItem>
</Dropdown>
```

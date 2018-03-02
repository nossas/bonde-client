### DropdownItem - with icon

```js { "props": { "className": "dark" } }
<Dropdown label='Minha sampa' width={200}>
  <DropdownItem onClick={() => alert('clicked Abrir página')}>
    <Icon name='share' /> Abrir página
  </DropdownItem>
  <DropdownItem onClick={() => alert('clicked Duplicar')}>
    <Icon name='copy' /> Duplicar
  </DropdownItem>
  <DropdownItem onClick={() => alert('clicked Criar template')}>
    <Icon name='star' /> Criar template
  </DropdownItem>
  <DropdownItem onClick={() => alert('clicked Arquivar')}>
    <Icon name='archive' /> Arquivar
  </DropdownItem>
  <DropdownItem onClick={() => alert('clicked Deletar')}>
    <Icon name='times' /> Deletar
  </DropdownItem>
</Dropdown>
```

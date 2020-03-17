### Dropdown

```js { "props": { "className": "dark" } }
import Dropdown from './DropdownExample';

<Dropdown
  item='Selecione uma fruta'
  list={['Melancia', 'Abobora', 'Batata']}
  onSelect={(item) => console.log('Item: ', item)}
/>
```

### Dropdown with DropdownIconItem

```js { "props": { "className": "dark" } }
import Dropdown from './DropdownExample';
import { DropdownIconItem } from '../';

<Dropdown
  item='Selecione uma fruta'
  list={[
    { icon: 'user', label: 'Users' },
    { icon: 'chart', label: 'Reports' },
    { icon: 'settings', label: 'Configurações' }
  ]}
  onSelect={(item) => console.log('Item: ', item)}
  dropdownItem={DropdownIconItem}
/>
```

### Community Dropdown Example

```js { "props": { "className": "dark" } }
import Dropdown from './DropdownExample';
import { DropdownImageItem } from '../';
import { Icon } from '../../content';
import { Flexbox2 as Flexbox, Spacing } from '../../layout';

<Flexbox horizontal align='center'>
  <Spacing margin={{ right: 10 }}>
    <Icon name='bonde' size={20} />
  </Spacing>
  <Dropdown
    item='Selecione uma comunidade'
    list={[
      {
        img: { src: 'https://s3.amazonaws.com/hub-central/uploads/1540751246_Ninguemficapratras-Logo.png', alt: 'Ninguém fica pra trás' },
        label: 'Ninguém fica pra trás'
      },
      {
        img: { src: 'https://s3.amazonaws.com/hub-central/uploads/1484260522_reboo.png', alt: 'Meu Rio' },
        label: 'Meu Rio'
      },
      {
        img: { src: 'https://s3.amazonaws.com/hub-central/uploads/1502212636_betaavatar.png', alt: 'BETA' },
        label: 'BETA'
      }
    ]}
    onSelect={(item) => console.log('Item: ', item)}
    dropdownItem={DropdownImageItem}
  />
</Flexbox>
```

### User Dropdown Example

```js { "props": { "className": "dark" } }
import Dropdown from './DropdownExample';
import { DropdownIconItem, DropdownImageItem } from '../';
import { Flexbox2 as Flexbox } from '../../layout';
import { Text, Title } from '../../content';

<Dropdown
  placeholder='Maria Benati'
  list={[
    {
      img: { src: 'http://via.placeholder.com/35x35?text=U', alt: 'User' },
      label: (
        <Flexbox vertical>
          <Title.H4>Maria Benati</Title.H4>
          <Text fontSize={14}>maria@benati.org</Text>
        </Flexbox>
      ),
      clickable: false,
      render: DropdownImageItem
    },
    { icon: 'pencil', label: 'Editar Perfil' },
    { icon: 'times', label: 'Sair' }
  ]}
  selectable={false}
  onSelect={(item) => console.log('Item: ', item)}
  dropdownItem={DropdownIconItem}
/>
```
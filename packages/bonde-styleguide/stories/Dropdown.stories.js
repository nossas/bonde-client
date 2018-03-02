// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import Wrapper from './Wrapper'
// import Dropdown, {
//   Item as DropdownItem,
//   Header as DropdownHeader
// } from '../src/Dropdown'
// import { Icon } from '../src'

// storiesOf('Dropdown', module)
//   .addDecorator(story => (
//     <Wrapper bg='#000'>
//       {story()}
//     </Wrapper>
//   ))
//   .addWithJSX('default', () => (
//     <Dropdown label='Dropdown'>
//       <DropdownItem onClick={action('clicked Menu 1')}>Menu 1</DropdownItem>
//       <DropdownItem onClick={action('clicked Menu 2')}>Menu 2</DropdownItem>
//     </Dropdown>
//   ))
//   .addWithJSX('with icon', () => (
//     <Dropdown label='Minha sampa' width={200}>
//       <DropdownItem onClick={action('clicked Abrir página')}>
//         <Icon.Share /> Abrir página
//       </DropdownItem>
//       <DropdownItem onClick={action('clicked Duplicar')}>
//         <Icon.Copy /> Duplicar
//       </DropdownItem>
//       <DropdownItem onClick={action('clicked Criar template')}>
//         <Icon.Star /> Criar template
//       </DropdownItem>
//       <DropdownItem onClick={action('clicked Arquivar')}>
//         <Icon.Archive /> Arquivar
//       </DropdownItem>
//       <DropdownItem onClick={action('clicked Deletar')}>
//         <Icon.Times /> Deletar
//       </DropdownItem>
//     </Dropdown>
//   ))
//   .addWithJSX('with Header', () => (
//     <Dropdown label='Maria Benati' width={190}>
//       <DropdownHeader>
//         <img src='http://via.placeholder.com/35x35?text=U' alt='User' />
//         <span>Maria Benatti</span>
//       </DropdownHeader>
//       <DropdownItem onClick={action('clicked Perfil')}>
//         <Icon.User /> Perfil
//       </DropdownItem>
//       <DropdownItem onClick={action('clicked Sair')}>
//         <Icon.Times /> Sair
//       </DropdownItem>
//     </Dropdown>
//   ))

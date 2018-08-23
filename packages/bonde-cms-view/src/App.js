import React, { Component } from 'react';
import PageStructure, { Navbar, Section, Widget } from './package'
import Form from './plugins/Form'

const sections = [
  { 
    id: 1,
    name: 'About',
    bgImage: 'https://s3.amazonaws.com/hub-central/uploads/1486682126__BONDE_capa_maju.png',
    position: 1
  },
  { 
    id: 2,
    name: 'Contact',
    bgImage: 'https://s3.amazonaws.com/hub-central/uploads/1496348747__bonde_tela2.5.png',
    position: 3
  },
  { 
    id: 3,
    name: 'Projects',
    bgImage: 'https://s3.amazonaws.com/hub-central/uploads/1496347540__bonde_tela3.5.png',
    position: 2
  }
]

const widgets = [
  { 
    kind: 'content',
    sectionId: 1,
    smSize: 12,
    mdSize: 6,
    lgSize: 6
  },
  { 
    kind: 'content',
    sectionId: 1,
    smSize: 12,
    mdSize: 6,
    lgSize: 6
  },
  { 
    kind: 'content',
    sectionId: 2,
    smSize: 12,
    mgSize: 12,
    lgSize: 12
  },
  { 
    kind: 'form',
    sectionId: 3,
    smSize: 12,
    mdSize: 6,
    lgSize: 6,
    settings: {
      "fields": [
	{
	  "uid": "field-1534967789181-5",
	  "kind": "email",
	  "label": "Email",
	  "placeholder": "Insira seu e-mail",
	  "required": "true"
	},{
	  "uid": "field-1534967803763-99",
	  "kind": "text",
	  "label": "Nome",
	  "placeholder": "Insira seu nome",
	  "required": "true"
	},
	{
          "uid": "field-1534971237536-91",
          "kind": "dropdown",
          "label": "Cidade",
          "placeholder": "São Paulo,Minas Gerais,Rio de Janeiro",
          "required": "false"
        }
      ],
      "count_text": "assinantes",
      "mainColor": "rgba(250,154,186,1)",
      "buttonText": "Assinar",
      "callToAction": "Preencha o formulário abaixo para assinar a petição"
    }
  },
  { 
    kind: 'content',
    sectionId: 3,
    smSize: 12,
    mdSize: 6,
    lgSize: 6
  }
]

const plugins = [
  {
    kind: 'content',
    component: ({ widget }) => <h3>Componente de conteúdo</h3>
  },
  {
    kind: 'form',
    component: Form,
    config: {
      validations: {
        'dropdown': (field, value) => {
          if (field.required === 'true' && !value) {
            return `${field.label} não pode ficar em branco.`
          }
        },
        'text': (field, value) => {
          if (field.required === 'true' && !value) {
            return `${field.label} não pode ficar em branco.`
          }
        },
        'email': (field, value) => {
          // eslint-disable-next-line
          const isValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (field.required === 'true' && !value) {
            return `${field.label} não pode ficar em branco.`
          } else if (value !== '' && !isValidEmail.test(value)) {
            return `${field.label} inválido.`
          }
        }
      }
    }
  }
]

const Footer = () => {
  const styles = {
    height: '50px',
    backgroundColor: 'black'
  }
  
  return (
    <div style={styles}>
      <p>Footer</p>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <PageStructure
        anchor={s => `section-${s.id}`}
        relationship={(section, widgets) => widgets.filter(({ sectionId }) => section.id === sectionId)}
        sections={sections}
        widgets={widgets}
        plugins={plugins}
        // order by asc by position
        ordering={(s1, s2) => s1.position - s2.position}
        renderNavigation={Navbar}
        renderNavigationItem={Navbar.Item}
        renderSection={Section}
        renderWidget={Widget}
        renderFooter={Footer}
      />
    );
  }
}

export default App;

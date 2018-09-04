import React, { Component } from 'react';
import PageStructure from '../engine'
import { Navbar, Section, Widget } from '../themes/bonde'
import FormUI from '../plugins/Form'
import ContentUI from '../plugins/Content'

const sections = [
  { 
    id: 1,
    name: 'About',
    bgImage: 'https://s3.amazonaws.com/hub-central/uploads/1486682126__BONDE_capa_maju.png',
    position: 1
  },
  { 
    id: 3,
    name: 'Contact',
    bgImage: 'https://s3.amazonaws.com/hub-central/uploads/1496348747__bonde_tela2.5.png',
    position: 3
  },
  { 
    id: 2,
    name: 'Projects',
    bgImage: 'https://s3.amazonaws.com/hub-central/uploads/1496347540__bonde_tela3.5.png',
    position: 2
  }
]

const widgets = [
  { 
    kind: 'draft',
    sectionId: 1,
    smSize: 12,
    mdSize: 6,
    lgSize: 6
  },
  { 
    kind: 'draft',
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
    lgSize: 12,
    settings: {
      content: "{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"Inserindo \",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]},{\"kind\":\"leaf\",\"text\":\"um\",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}},{\"kind\":\"mark\",\"type\":\"font-size\",\"data\":{\"fontSize\":\"30\"}}]},{\"kind\":\"leaf\",\"text\":\" texto do \",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]},{\"kind\":\"leaf\",\"text\":\"editor\",\"marks\":[{\"kind\":\"mark\",\"type\":\"bold\",\"data\":{}},{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]},{\"kind\":\"leaf\",\"text\":\" com algumas \",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]},{\"kind\":\"leaf\",\"text\":\"configurações\",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}},{\"kind\":\"mark\",\"type\":\"font-family\",\"data\":{\"fontFamilyIndex\":\"28\"}}]},{\"kind\":\"leaf\",\"text\":\"!\",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]}]}]},{\"kind\":\"block\",\"type\":\"alignment\",\"isVoid\":false,\"data\":{\"align\":\"center\",\"currentBlockType\":\"line\"},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"Mais um texto para \",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]}]},{\"kind\":\"inline\",\"type\":\"link\",\"isVoid\":false,\"data\":{\"title\":\"Link do slate editor\",\"href\":\"http://app.bonde.org\",\"text\":\"saber\",\"target\":\"_blank\"},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"saber\",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]}]}]},{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\" se está tudo ok.\",\"marks\":[{\"kind\":\"mark\",\"type\":\"color\",\"data\":{\"rgba\":{\"r\":15,\"g\":14,\"b\":14,\"a\":1}}}]}]}]}]}}"
    }
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
    kind: 'draft',
    sectionId: 3,
    smSize: 12,
    mdSize: 6,
    lgSize: 6
  }
]

const plugins = [
  {
    kind: 'draft',
    component: ({ widget }) => <div>{widget.kind}</div>
  },
  {
    kind: 'content',
    component: ContentUI,
    props: ({ widget }) => ({ content: widget.settings.content })
  },
  {
    kind: 'form',
    component: FormUI,
    props: ({ widget }) => {
      const { buttonText, callToAction, fields, mainColor } = widget.settings
      
      const validations = {
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

      return {
        bgColor: mainColor,
        headerTitle: callToAction,
        submitLabel: buttonText,
        onSubmit: (values) => new Promise((resolve, reject) => { 
          // simulate request time
          return setTimeout(resolve, 5000)
        }),
        fields,
        validations,
        successfullyComponent: () => (<div className='successfully' />),
        loadingComponent: () => (<div className='loading'>Carregando!</div>)
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
        anchorLink={s => `section-${s.id}`}
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

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { Footer } from '../src'

const onHelpClick = () => {}

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .addWithJSX('default', () => (
    <Footer
      btnHelpLabel={text('Help Label', 'Ajuda eu')}
      btnHelpClick={onHelpClick}
    >
      <a href='#' title='Sobre'>Sobre</a>
      <a href='#' title='Contato'>Contato</a>
    </Footer>
  ))

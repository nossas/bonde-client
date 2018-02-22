import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, color, select, text } from '@storybook/addon-knobs/react'
import Wrapper from './Wrapper'
import { Title } from '../src'

const createKnobs = (TextComponent) => () => {
  const alignment = { 'left': 'left', 'right': 'right', 'center': 'center' }
  return (
    <TextComponent
      color={color('Color', '#000')}
      align={select('Align', alignment, 'left')}
      margin={text('Margin')}
    >
      {text('Children', 'Title')}
    </TextComponent>
  )
}

storiesOf('Title', module)
  .addDecorator(withKnobs)
  .addWithJSX('H1', createKnobs(Title.H1))
  .addWithJSX('H2', createKnobs(Title.H2))
  .addWithJSX('H3', createKnobs(Title.H3))

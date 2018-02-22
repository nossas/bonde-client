import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Wrapper from './Wrapper'
import { Preformatted, Hightlight } from './Icon.stories'
import Loading from '../src/Loading/Loading'

storiesOf('Loading', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('Default', () => (
    <center>
      <p><Loading /></p>
      <Preformatted>
        <Hightlight code={
`// Default values

<Loading
  color='#050505'
  size='176'
  sparklesColor='#35E3C3'
  sparklesColorInit='#DBDBDB'
  sparklesDuration='6s'
/>`
        } />
      </Preformatted>
    </center>
  ))
  .add('resize', () => (
    <center>
      <p><Loading size='50' /></p>
      <Preformatted>
        <Hightlight code={`<Loading size='50' />`} />
      </Preformatted>
    </center>
  ))
  .add('icon color', () => (
    <center>
      <p><Loading color='#DD2295' /></p>
      <Preformatted>
        <Hightlight code={`<Loading color='#DD2295' />`} />
      </Preformatted>
    </center>
  ))
  .add('sparkles animation color', () => (
    <center>
      <p><Loading sparklesColor='#985368' /></p>
      <Preformatted>
        <Hightlight code={`<Loading sparklesColor='#985368' />`} />
      </Preformatted>
    </center>
  ))
  .add('sparkles initial color', () => (
    <center>
      <p><Loading sparklesColorInit='#000000' /></p>
      <Preformatted>
        <Hightlight code={`<Loading sparklesColorInit='#000000' />`} />
      </Preformatted>
    </center>
  ))
  .add('sparkles change colors', () => (
    <center>
      <p><Loading sparklesColorInit='#FFFFFF' sparklesColor='#FFD500' /></p>
      <Preformatted>
        <Hightlight code={
`<Loading
  sparklesColorInit='#FFFFFF'
  sparklesColor='#FFD500'
/>`
        } />
      </Preformatted>
    </center>
  ))
  .add('sparkles duration', () => (
    <center>
      <p><Loading sparklesDuration='1s' /></p>
      <Preformatted>
        <Hightlight code={`<Loading sparklesDuration='1s' />`} />
      </Preformatted>
    </center>
  ))

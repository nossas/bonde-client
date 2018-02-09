import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import * as IconColorful from '../src/IconColorful'

storiesOf('IconColorful', module)
  .addDecorator(story => <Wrapper>{story()}</Wrapper>)
  .add('Abc', () => <IconColorful.Abc />)
  .add('Code', () => <IconColorful.Code />)
  .add('Community', () => <IconColorful.Community />)
  .add('DollarSign', () => <IconColorful.DollarSign />)
  .add('Greeting', () => <IconColorful.Greeting />)
  .add('Mobilization', () => <IconColorful.Mobilization />)
  .add('Ok', () => <IconColorful.Ok />)
  .add('People', () => <IconColorful.People />)
  .add('Picture', () => <IconColorful.Picture />)
  .add('Power', () => <IconColorful.Power />)
  .add('Pressure', () => <IconColorful.Pressure />)
  .add('Share', () => <IconColorful.Share />)
  .add('Video', () => <IconColorful.Video />)

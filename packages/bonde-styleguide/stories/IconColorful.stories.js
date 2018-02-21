import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import * as IconColorful from '../src/IconColorful'

storiesOf('IconColorful', module)
  .addDecorator(story => <Wrapper>{story()}</Wrapper>)
  .addWithJSX('Abc', () => <IconColorful.Abc />)
  .addWithJSX('Code', () => <IconColorful.Code />)
  .addWithJSX('Community', () => <IconColorful.Community />)
  .addWithJSX('DollarSign', () => <IconColorful.DollarSign />)
  .addWithJSX('Greeting', () => <IconColorful.Greeting />)
  .addWithJSX('Mobilization', () => <IconColorful.Mobilization />)
  .addWithJSX('Ok', () => <IconColorful.Ok />)
  .addWithJSX('People', () => <IconColorful.People />)
  .addWithJSX('Picture', () => <IconColorful.Picture />)
  .addWithJSX('Power', () => <IconColorful.Power />)
  .addWithJSX('Pressure', () => <IconColorful.Pressure />)
  .addWithJSX('Share', () => <IconColorful.Share />)
  .addWithJSX('Video', () => <IconColorful.Video />)

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import * as IconColorful from '../src/IconColorful'

storiesOf('IconColorful', module)
  .add('Abc', () => (<Wrapper><IconColorful.Abc /></Wrapper>))
  .add('Code', () => (<Wrapper><IconColorful.Code /></Wrapper>))
  .add('Community', () => (<Wrapper><IconColorful.Community /></Wrapper>))
  .add('DollarSign', () => (<Wrapper><IconColorful.DollarSign /></Wrapper>))
  .add('Greeting', () => (<Wrapper><IconColorful.Greeting /></Wrapper>))
  .add('Mobilization', () => (<Wrapper><IconColorful.Mobilization /></Wrapper>))
  .add('Ok', () => (<Wrapper><IconColorful.Ok /></Wrapper>))
  .add('People', () => (<Wrapper><IconColorful.People /></Wrapper>))
  .add('Picture', () => (<Wrapper><IconColorful.Picture /></Wrapper>))
  .add('Power', () => (<Wrapper><IconColorful.Power /></Wrapper>))
  .add('Pressure', () => (<Wrapper><IconColorful.Pressure /></Wrapper>))
  .add('Share', () => (<Wrapper><IconColorful.Share /></Wrapper>))
  .add('Video', () => (<Wrapper><IconColorful.Video /></Wrapper>))

import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'

import Wrapper from './Wrapper'
import List from '../src/List'

const createKnobsList = ({ label, description, ...props }) => (
  <List>
    <List.Item
      label={text('label', label)}
      description={text('description', description)}
      avatar={text('avatar', 'https://goo.gl/f8fg1R')}
      noavatar={boolean('noavatar', false)}
      {...props}
    />
  </List>
)

const options = {
  showDefaultProps: false,
  showFunctions: false
}

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <Wrapper position='relative' padding='0' width='inherit'>
      {story()}
    </Wrapper>
  ))

  .addWithJSX(
    'default',
    () => createKnobsList({
      label: 'List: default Example Label',
      description: 'List: default Example Label Description'
    }),
    options
  )

  .addWithJSX(
    'onClick',
    () => createKnobsList({
      label: 'List: onClick Example Label',
      description: 'List: onClick Example Label Description',
      onClick: action('[List: onClick]')
    }),
    options
  )

  .addWithJSX(
    'href',
    () => createKnobsList({
      label: 'List: href Example Label',
      description: 'List: href Example Label Description',
      href: 'https://google.com',
      target: '_blank'
    }),
    options
  )

  .addWithJSX(
    'LinkComponent',
    () => createKnobsList({
      label: 'List: LinkComponent Example Label',
      description: 'List: LinkComponent Example Label Description',
      LinkComponent: styled.div.attrs({
        onClick: () => action('[List: LinkComponent]')
      })`
        background-color: #efefef;
        cursor: pointer;
        transition: 200ms box-shadow;
        &:hover { box-shadow: inset 0 0 15px 0 rgba(0,0,0,.3) }
      `
    }),
    options
  )

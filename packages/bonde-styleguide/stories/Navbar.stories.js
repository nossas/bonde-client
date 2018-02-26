import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { Navbar } from '../src'
import { MainNav, UserNav } from '../src/Navigation'
import { jsxOptions } from './utils'

storiesOf('Navbar', module)
  .addDecorator(withKnobs)
  .addWithJSX('default', () => (
    <Navbar
      homePageTitle={text('Title', 'Bonde.org')}
      homePageUrl={text('Url', 'http://bonde.org')}
    />
  ), jsxOptions)
  .addWithJSX('with 1 nav', () => (
    <Navbar>
      <MainNav />
    </Navbar>
  ), jsxOptions)
  .addWithJSX('with 2 navs', () => (
    <Navbar>
      <MainNav />
      <UserNav />
    </Navbar>
  ), jsxOptions)

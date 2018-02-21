import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

import Wrapper from './Wrapper'
import Title from '../src/Title'
import * as Icon from '../src/Icon'

export const Preformatted = styled.pre`{
  word-wrap: normal;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
  margin: 10px 0;
  font: 12px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  box-sizing: border-box;
  text-align: left;
}`

export const Code = styled.span`
  padding: 3px 7px 5px;
  background-color: #efefef;
  border-radius: 3px;
  font-size: 85%;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;

  ${({ bordered }) => bordered && `
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,.12);
    font-style: normal;
  `}
`

export const Hightlight = ({ code }) => (
  <div dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages.js) }} />
)

const CommonStructure = ({ name, component: Component }) => (
  <Wrapper>
    <div>
      <center>
        <p><Component /></p>
        <Preformatted>
          <Hightlight code={`<Icon.${name} />`} />
        </Preformatted>
      </center>

      <center>
        <p><Component color='#f00' /></p>
        <Preformatted>
          <Hightlight code={`<Icon.${name} color='#f00' />`} />
        </Preformatted>
      </center>

      <center>
        <p><Component size='36' /></p>
        <Preformatted>
          <Hightlight code={`<Icon.${name} size='36' />`} />
        </Preformatted>
      </center>

      <center>
        <p><Component color='rgba(0, 0, 0, .2)' size='20' /></p>
        <Preformatted>
          <Hightlight code={`<Icon.${name} color='rgba(0, 0, 0, .2)' size='20' />`} />
        </Preformatted>
      </center>
    </div>
  </Wrapper>
)

storiesOf('Icon', module)
  .add('AngleDown', () => <CommonStructure name='AngleDown' component={Icon.AngleDown} />)
  .add('AngleRight', () => <CommonStructure name='AngleRight' component={Icon.AngleRight} />)
  .add('Archive', () => <CommonStructure name='Archive' component={Icon.Archive} />)
  .add('Copy', () => <CommonStructure name='Copy' component={Icon.Copy} />)
  .add('Plus', () => <CommonStructure name='Plus' component={Icon.Plus} />)
  .add('Share', () => <CommonStructure name='Share' component={Icon.Share} />)
  .add('Sound', () => <CommonStructure name='Sound' component={Icon.Sound} />)
  .add('Star', () => <CommonStructure name='Star' component={Icon.Star} />)
  .add('Times', () => <CommonStructure name='Times' component={Icon.Times} />)
  .add('User', () => <CommonStructure name='User' component={Icon.User} />)

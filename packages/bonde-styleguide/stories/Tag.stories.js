import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import Tag from '../src/Tag'

storiesOf('Tag', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('Default', () => <Tag text='Default' />)
  .add('checked', () => <Tag text='Checked' checked />)
  .add('list of tags', () => (
    [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: true },
      { id: 4, checked: false },
      { id: 5, checked: true },
      { id: 6, checked: false }
    ].map(({ id, checked }) => (
      <React.Fragment key={id}>
        <Tag
          text={`Item ${id}`}
          name={`selectedTags[${id}]`}
          checked={checked}
          onChange={action('onChange')}
        />
      </React.Fragment>
    ))
  ))

// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import { withKnobs, boolean, text } from '@storybook/addon-knobs/react'

// import Wrapper from './Wrapper'
// import Tag from '../src/Tag'

// storiesOf('Tag', module)
//   .addDecorator(withKnobs)
//   .addDecorator(story => <Wrapper>{story()}</Wrapper>)
//   .addWithJSX('default', () => (
//     <Tag
//       text={text('Text', 'Tag')}
//       checked={boolean('Checked', false)}
//     />
//   ))
//   .addWithJSX('list of tags', () => (
//     [
//       { id: 1, checked: false },
//       { id: 2, checked: false },
//       { id: 3, checked: true },
//       { id: 4, checked: false },
//       { id: 5, checked: true },
//       { id: 6, checked: false }
//     ].map(({ id, checked }) => (
//       <Tag
//         key={id}
//         text={`Item ${id}`}
//         name={`selectedTags[${id}]`}
//         checked={checked}
//       />
//     ))
//   ))

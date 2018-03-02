// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react'
// import Wrapper from './Wrapper'
// import { ControlLabel, Input, Select, Checkbox, Radio } from '../src/Form'

// const withLayoutCentralized = (story) => <Wrapper>{story()}</Wrapper>

// storiesOf('Form', module)
//   .addDecorator(withKnobs)
//   .addDecorator(withLayoutCentralized)
//   .addWithJSX('Input', () => (
//     <Input
//       placeholder={text('Placeholder', 'Placeholder')}
//       value={text('Value', '')}
//       invalid={boolean('Invalid', false)}
//       disabled={boolean('Disabled', false)}
//     />
//   ))
//   .addWithJSX('ControlLabel', () => (
//     <ControlLabel>{text('Children', 'Label')}</ControlLabel>
//   ))
//   .addWithJSX('Select', () => {
//     const options = {
//       'empty': '',
//       'opt1': 'First',
//       'opt2': 'Second'
//     }
//     const value = select('Value', options, 'empty', 'SelectGroupID')
//     return (
//       <Select
//         value={value}
//         invalid={boolean('Invalid', false)}
//         disabled={boolean('Disabled', false)}
//       >
//         <option value='empty'>Select</option>
//         <option value='opt1'>First</option>
//         <option value='opt2'>Second</option>
//       </Select>
//     )
//   })
//   .addWithJSX('Checkbox', () => (
//     <Checkbox
//       checked={boolean('Checked', false)}
//       readOnly={boolean('ReadOnly', false)}
//       disabled={boolean('Disabled', false)}
//     >
//       {text('Children', 'Checkbox')}
//     </Checkbox>
//   ))
//   .addWithJSX('Radio', () => (
//     <Radio
//       checked={boolean('Checked', false)}
//       readOnly={boolean('ReadOnly', false)}
//       disabled={boolean('Disabled', false)}
//     >
//       {text('Children', 'Radio')}
//     </Radio>
//   ))

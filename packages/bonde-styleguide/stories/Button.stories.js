// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
// import Wrapper from './Wrapper'
// import { Button } from '../src'

// const createButtonKnobs = (opts = {}) => () => (
//   <Wrapper bg={opts.dark && '#000'}>
//     <Button
//       light={opts.light || false}
//       dark={opts.dark || false}
//       disabled={boolean('Disabled', false)}
//     >
//       {text('Children', 'Botão')}
//     </Button>
//   </Wrapper>
// )

// const skip = 1

// storiesOf('Button', module)
//   .addDecorator(withKnobs)
//   .addWithJSX('Default', createButtonKnobs(), { skip })
//   .addWithJSX('Light', createButtonKnobs({ light: true }), { skip })
//   .addWithJSX('Dark', createButtonKnobs({ dark: true }), { skip })

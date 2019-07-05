import React from 'react'
import {
  Flexbox2 as Flexbox,
  Loading as LoadingStyled,
  Text,
  Title
} from 'bonde-styleguide'
import PropTypes from 'prop-types'

const Loading = ({ message }) => (
  <Flexbox vertical>
    <Text align='center' margin={{ top: '20vh' }}>
      <LoadingStyled
        size={109}
        sparklesDuration='3s'
      />
    </Text>
    {message && (
      <Title.H3 align='center'>
        {message}
      </Title.H3>
    )}
  </Flexbox>
)

Loading.propTypes = {
  message: PropTypes.string
}

export default Loading

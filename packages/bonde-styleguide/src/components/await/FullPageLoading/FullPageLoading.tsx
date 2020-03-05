import React from 'react'

import { TextLoading } from '../'
import { Backdrop } from '../../layout'

interface Props {
  bgColor: string;
  message: string;
}

const LoadingFullScreen = ({ bgColor = '#fff', message }: Props) => (
  <Backdrop color={bgColor}>
    <TextLoading message={message} />
  </Backdrop>
)

export default LoadingFullScreen

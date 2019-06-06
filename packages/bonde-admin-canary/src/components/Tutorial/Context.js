import { createContext } from 'react'

export const defaultContext = {
  currentStep: 0,
  steps: []
}

export default createContext(defaultContext)

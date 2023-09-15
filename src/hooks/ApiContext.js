import { createContext, useContext } from 'react'

const ApiContext = createContext({
  token: '',
  config: {},
})

const useApiContext = () => (useContext(ApiContext))

export default ApiContext
export { useApiContext }

import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import './index.css'
import {
  ApiContext,
} from '@hooks'

const isSecure = import.meta.env.VITE_API_SECURE
const apiUrl = import.meta.env.VITE_API_URL
const apiPort = import.meta.env.VITE_API_PORT
const apiPath = import.meta.env.VITE_API_PATH
const config = {
  apiSecure: isSecure,
  apiUrl,
  apiPort,
  apiPath,

}

const Main = () => {
  const [token, setToken] = useState({ token: '' })
  console.log(config)
  return (
    <ApiContext.Provider value={{ token, config }}>
      <App />
    </ApiContext.Provider >
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)

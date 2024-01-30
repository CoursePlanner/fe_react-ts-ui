import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './utils/store/store'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/scss/bootstrap.scss'

const rootElement = document.querySelector('#root')!
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

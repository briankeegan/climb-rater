import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './miscellaneous/registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

// process.env is for ghpages, a work around to allow routes to function within ghpages.  Not neccessary if hosted elsewhere
ReactDOM.render(
  // eslint-disable-next-line
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App/>
  </BrowserRouter>,
  document.getElementById('root'))
registerServiceWorker()

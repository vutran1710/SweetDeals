import '@style/app.scss'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { LandingPage } from './LandingPage'

const jsx = (
  <Router>
    <LandingPage />
  </Router>
)

ReactDOM.hydrate(jsx, document.getElementById('root'))

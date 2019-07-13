import { Loading } from '@base'
import { Calculator } from '@container'
import * as React from 'react'
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom'

const Index = () => (
  <div>
    <h2>Hello World</h2>
    <Link to="/calc">
      Click to open calculator
    </Link>
  </div>
)

export const LandingPage = () => (
  <Switch>
    <Route path="/calc" component={Calculator} />
    <Route path="/" component={Index} />
  </Switch>
)

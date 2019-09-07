import {
  Loading,
  Page404,
} from '@base'
import { format } from 'date-fns'
import * as React from 'react'
import * as Loadable from 'react-loadable'
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom'

const Index = () => {
  const time = format(Date.now(), 'MM/dd/yyyy __ hh:mm')
  return (
    <div>
      <h2>Hello World</h2>
      <Link to="/calc" style={{ textDecoration: 'none' }}>
        Click to open final calculator ({time})
      </Link>
    </div>
  )
}

const LazyCalculator = Loadable({
  loader: () => import('@container/Calculator'),
  loading: Loading,
  render: loaded => {
    const Component = loaded.Calculator
    return <Component />
  }
})

export const LandingPage = () => (
  <Switch>
    <Route path="/calc" exact={true} component={LazyCalculator} />
    <Route path="/" exact={true} component={Index} />
    <Route component={Page404} />
  </Switch>
)

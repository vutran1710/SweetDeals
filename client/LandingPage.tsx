import * as React from 'react'
import * as Loadable from 'react-loadable'
import { Link, Switch, Route } from 'react-router-dom'
import { Loading } from '@base'

const Index = () => (
  <div>
    <h2>Hello World</h2>
    <Link to="/calc">
      Click to open calculator
    </Link>
  </div>
)

const LazyCalculator = Loadable({
  loader: () => import('@container/Calculator'),
  loading: Loading,
  render: ({ Calculator }) => <Calculator />
})

export const LandingPage = () => (
  <Switch>
    <Route path="/calc" component={LazyCalculator} />
    <Route path="/" component={Index} />
  </Switch>
)

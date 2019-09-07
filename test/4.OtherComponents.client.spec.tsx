import { Loading } from '@base'
import {
  cleanup,
  render,
} from '@testing-library/react'
import * as React from 'react'

describe('ClientTest: Static-Components', () => {

  let R

  before(() => {
    R = render(<Loading />)
  })

  it('#1. Static Components should render without crashing', async () => {
    R.getByText(/loading/gi)
  })

  after(done => {
    cleanup()
    done()
  })

})

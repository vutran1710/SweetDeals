import { Calculator } from '@container'
import * as http from '@http'
import {
  cleanup,
  fireEvent,
  render,
  wait,
} from '@testing-library/react'
import { expect } from 'chai'
import 'isomorphic-fetch'
import * as React from 'react'
import * as sinon from 'sinon'

describe('ClientTest: Calculator', () => {

  let R

  before(() => {
    R = render(<Calculator />)
  })

  it('#1. Should render without crashing', async () => {
    const fakeHttp = sinon.stub(http, 'calculate').resolves({ result: 18 })

    R.getAllByText('AC')
    const Num9 = R.getByText('9')
    const Num2 = R.getByText('2')
    const MultiplyOp = R.getByText('x')
    const EqualOp = R.getByText('=')

    fireEvent.click(Num9)
    fireEvent.click(MultiplyOp)
    fireEvent.click(Num2)
    fireEvent.click(EqualOp)
    expect(fakeHttp.called).to.be.true
    await wait()
    R.getByText(/18/g)
  })

  after(done => {
    cleanup()
    done()
  })

})

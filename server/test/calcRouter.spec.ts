import * as express from 'express'
import * as request from 'supertest'
import * as sinon from 'sinon'
import { expect } from 'chai'
import { Calculation } from '@model'
import { calcRouter } from '../routes'

const app = express()
app.use(express.json())
app.use(calcRouter)
app.use((err, req, res, next) => res.status(err.status || 500).json({
  message: err.message,
  error: err
}))

const mockResult = {
  _id: '123',
  a: 1,
  b: 2,
  operand: 'add',
  result: 3,
  regTime: Date.now()
}

const task = { a: 1, b: 2, operand: 'add' }

describe('## Calculation API', () => {

  it('1.1 Should return sum of 2 numbers', done => {
    const findOne = sinon.stub(Calculation, 'findOne').yields(null, mockResult)
    findOne.withArgs(task)
    request(app).post('/calc').send(task).expect(200, () => {
      findOne.restore()
      done()
    })
  })
})

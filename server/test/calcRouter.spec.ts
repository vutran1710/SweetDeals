import * as express from 'express'
import * as request from 'supertest'
import * as sinon from 'sinon'
import * as assert from 'assert'
import { expect } from 'chai'
import { Calculation } from '@model'
import app from '../index'

const mockResult = {
  _id: '123',
  a: 1,
  b: 2,
  operand: 'add',
  result: 3,
  regTime: Date.now()
}

const task = { a: 1, b: 2, operand: 'add' }

const sandbox = sinon.createSandbox()

describe('## 2. Calculation API', () => {
  afterEach(() => {
    sandbox.restore()
  })

  it('2.1 Should return result as new database entry', done => {
    sandbox.stub(Calculation, 'findOne').returns({ exec: cb => cb(null, null) })
    sandbox.stub(Calculation.prototype, 'save').resolves(mockResult)

    request(app)
      .post('/calc')
      .send(task)
      .expect(201)
      .expect(({ body }) => expect(body).to.deep.equal(mockResult))
      .end(done)
  })

  it('2.2 Should return a cache result', done => {
    sandbox.stub(Calculation, 'findOne').returns({ exec: cb => cb(null, mockResult) })
    const expectedResult = { a: 1, b: 2, result: 3, msg: 'cached' }

    request(app)
      .post('/calc')
      .send(task)
      .expect(200)
      .expect(({ body }) => expect(body).to.deep.equal(expectedResult))
      .end(done)
  })
})

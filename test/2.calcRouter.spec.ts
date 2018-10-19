import * as express from 'express'
import * as request from 'supertest'
import * as sinon from 'sinon'
import * as assert from 'assert'
import { expect } from 'chai'
import { Calculation } from '@model'
import { ERROR_MSG } from '@constant'
import app from '../server/index'

const mockResult = {
  _id: '123',
  a: 1,
  b: 2,
  operand: 'add',
  result: 3,
  regTime: Date.now()
}

const cachedResult = {
  a: 1,
  b: 2,
  result: 3,
  msg: 'cached'
}

const task = { a: 1, b: 2, operand: 'add' }

const sandbox = sinon.createSandbox()

describe('## 2. Calculation API', () => {
  afterEach(() => sandbox.restore())

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

    request(app)
      .post('/calc')
      .send(task)
      .expect(200)
      .expect(({ body }) => expect(body).to.deep.equal(cachedResult))
      .end(done)
  })

  it('2.3 Test divide by Zero', done => {
    const payload = { a: 1, b: 0, operand: 'divide' }

    request(app)
      .post('/calc')
      .send(payload)
      .expect(400)
      .expect(res => expect(res.body.error).to.equal(ERROR_MSG.INVALID_CALC))
      .end(done)
  })

  it('2.4 Missing params', done => {
    const payload = { a: 1, operand: 'divide' }

    request(app)
      .post('/calc')
      .send(payload)
      .expect(400)
      .expect(res => expect(res.body.error).to.equal(ERROR_MSG.MISSING_PARAM))
      .end(done)
  })

  it('2.5 Unsupported operand', done => {
    const payload = { a: 1, b: 2, operand: 'percent' }

    request(app)
      .post('/calc')
      .send(payload)
      .expect(400)
      .expect(res => expect(res.body.error).to.equal(ERROR_MSG.UNSUPORTED))
      .end(done)
  })

  it('2.6 Database connection error', done => {
    sandbox.stub(Calculation, 'findOne').returns({ exec: cb => cb(true, null) })

    request(app)
      .post('/calc')
      .send(task)
      .expect(500)
      .expect(({ body }) => expect(body.error).to.equal(ERROR_MSG.DB_ERR))
      .end(done)
  })


  it('2.7 Database record creation error', done => {
    const saveError = { error: 'cannot save' }
    sandbox.stub(Calculation, 'findOne').returns({ exec: cb => cb(null, null) })
    sandbox.stub(Calculation.prototype, 'save').throws({ error: saveError })

    request(app)
      .post('/calc')
      .send(task)
      .expect(500)
      .expect(({ body }) => expect(body.error).to.deep.equal(saveError))
      .end(done)
  })

})

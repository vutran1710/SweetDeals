import * as request from 'supertest'
import { expect } from 'chai'
import { Calculation } from '@model'
import { ERROR_MSG } from '@constant'
import app from '../server/index'
import { calculator } from '../server/routes/calcRouter'


describe('Creating documents', () => {
  const task = { a: 1, b: 2, operand: 'add' }
  const mock = { ...task, result: 3  }

  before('Clear all the test document', async () => {
    await Calculation.deleteMany({ result: 3 })
    const count = await Calculation.countDocuments()
    expect(count).to.equal(0)
  })

  it('2.1 Test calculator\'s functions', () => {
    const expectation = [
      { k: 'subtract', v: -1 },
      { k: 'add', v: 3 },
      { k: 'multiply', v: 2 },
      { k: 'divide', v: 0.5 },
    ]
    return expectation.forEach(item => expect(calculator[item.k](1, 2)).to.equal(item.v))
  })

  it('2.2 Should return result as new database entry', done => {
    request(app).post('/calc').send(task)
                .expect(201)
                .expect(response => {
                  expect(Boolean(response.body._id)).to.be.true
                  expect(response.body.result).to.equal(mock.result)
                }).end(done)
  })

  it('2.3 Should return memoized result', done => {
    request(app).post('/calc').send(task)
                .expect(200)
                .expect(response => {
                  expect(Boolean(response.body._id)).to.be.true
                  expect(response.body.msg).to.equal('memoized')
                }).end(done)
  })

  const evalError = error => resp => expect(resp.body.error).to.equal(error)

  it('2.4 Test Errors: missing param', done => {
    const payload = { a: 1 }
    request(app).post('/calc').send(payload).expect(400)
                .expect(evalError(ERROR_MSG.MISSING_PARAM))
                .end(done)
  })

  it('2.5 Test Errors: divide by zero', done => {
    const payload = { a: 1, b: 0, operand: 'divide' }
    request(app).post('/calc').send(payload).expect(400)
                .expect(evalError(ERROR_MSG.INVALID_CALC))
                .end(done)
  })

  it('2.6 Test Errors: invalid operand', done => {
    const payload = { a: 1 , b: 1, operand: 'not-supported' }
    request(app).post('/calc').send(payload).expect(400)
                .expect(evalError(ERROR_MSG.UNSUPORTED))
                .end(done)
  })


})

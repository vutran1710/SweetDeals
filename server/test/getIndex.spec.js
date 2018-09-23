import express from 'express'
import request from 'supertest'
import { expect } from 'chai'
import indexRouter from '../routes/index'

const app = express()
app.use(indexRouter)

describe('## Get index', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})

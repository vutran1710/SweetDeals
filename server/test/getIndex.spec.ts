import * as express from 'express'
import * as request from 'supertest'
import { indexRouter } from '../routes'

const app = express()
app.use(indexRouter)

describe('## Get index', () => {
  it('should return 200', done => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})

import * as express from 'express'
import * as request from 'supertest'
import { expect } from 'chai'

import app from '../server/index'

describe('## 1. Get index', () => {
  it('should return 200 with a html', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.be.a('string')
        done()
      })
  })
})

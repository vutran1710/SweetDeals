import * as express from 'express'
import * as request from 'supertest'
import { expect } from 'chai'

import app from '../server/index'

describe('## 1. Get index', () => {
  it('1.1 Should return 200 with a html', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.be.a('string')
        done()
      })
  })

  it('1.2 Should return 500 when error happens', done => {
    // Fake failure to load react at server side

    request(app)
      .get('/')
      .expect(500)
      .end(done)
  })
})

import * as express from 'express'
import * as request from 'supertest'
import * as proxyquire from 'proxyquire'
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
    // Fake failure to load template file at server side
    const templateErr = 'Cant find template file'
    const stubs = {
      fs: {
        readFile: () => Promise.reject(templateErr)
      },
      util: {
        promisify: r => r
      }
    }

    const proxiedRouter = proxyquire('../server/routes/indexRouter', stubs).indexRouter

    const proxiedApp = express()
    proxiedApp.use(express.json())
    proxiedApp.use(proxiedRouter)

    request(proxiedApp)
      .get('/')
      .expect(500)
      .end((err, res) => {
        expect(res).to.have.property('body')
        expect(res.body).to.have.property('error')
        expect(res.body.error).to.equal(templateErr)
        done()
      })
  })
})

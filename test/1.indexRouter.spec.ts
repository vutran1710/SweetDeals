import * as express from 'express'
import * as request from 'supertest'
import * as proxyquire from 'proxyquire'
import { expect } from 'chai'
import app from '../server/index'

describe('## 1. Get index', () => {
  const agent = request.agent(app)

  it('1.1 Should return 200 with a html', done => {
    agent.get('/')
         .expect(200)
         .end((err, res) => {
           expect(res.text).to.be.a('string')
           done()
         })
  })

  it('1.2 Should return 404 Page when unknown route requested', done => {
    agent.get('/sdfsdfs')
         .expect(200)
         .end((err, res) => {
           expect(res.text).to.contain('404')
           done()
         })
  })
})

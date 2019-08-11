import { expect } from 'chai'
import * as request from 'supertest'
import server from '../server/index'

describe('## 1. Get pages', () => {
  const agent = request.agent(server)

  after(done => {
    server.close()
    done()
  })

  it('1.1 Should return 200 with a html', done => {
    agent.get('/')
         .expect(200)
         .end((err, res) => {
           expect(res.text).to.contain('Hello World')
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

import { LandingPage } from 'client/LandingPage'
import * as template from 'es6-template-strings'
import * as express from 'express'
import { readFile as fsReadFile } from 'fs'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { promisify } from 'util'

const router = express.Router()
const htmlPath = process.env.NODE_ENV === 'test' ? 'client/index.html' : 'build/index.html'
const readFile = promisify(fsReadFile)

const jsx = (context, req) => (
  <StaticRouter context={context} location={req.url}>
    <LandingPage />
  </StaticRouter>
)

router.get('/*', (req, res) => {
  const context = {}
  const renderApp = ReactDOMServer.renderToString(jsx(context, req))
  const responseRender = templateString => res.send(template(templateString, { renderApp }))
  // TODO: replace {error} with 500.html
  const errorReadfile = error => res.status(500).send({ error })
  return readFile(htmlPath, 'utf-8').then(responseRender).catch(errorReadfile)
})

export const indexRouter = router

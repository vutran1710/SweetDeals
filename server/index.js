import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import template from 'es6-template-strings'
import { renderToString } from 'react-dom/server'
import { promisify } from 'util'

import Index from '../client/Index'
import indexRouter from './routes/index'

const app = express()
const router = express.Router()
const port = 3000
const isProd = process.env.NODE_ENV === 'production'
const htmlPath = 'build/index.html'
const readFile = promisify(fs.readFile)
const readHtml = async cb => { return await readFile(htmlPath, 'utf-8', cb) }

app.get('/*', (req, res) => {
  const renderApp = Index
  const responseRender = (err, data) => {
    if (err) throw err
    res.status(200).render(template(data, { renderApp }))
  }
  const errorReadfile = e => res.status(400).send(e)
  return readHtml(responseRender).catch(errorReadfile)
})

/* app.use(indexRouter) */

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

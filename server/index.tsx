import * as express from 'express'
import * as path from 'path'
import * as Loadable from 'react-loadable'
import * as mongoose from 'mongoose'
import { indexRouter, calcRouter } from './routes'

const app = express()
const port = process.env.PORT
const isProd = process.env.NODE_ENV === 'production'
const db = process.env.DB

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/client', express.static(path.resolve('build/client')))
app.use('/asset', express.static(path.resolve('build/asset')))

app.use(calcRouter)
app.use(indexRouter)

Loadable.preloadAll().then(() => {
  // tslint:disable-next-line
  mongoose.connect(db, err => !isProd && console.log(err ? err : 'Success'))
  const conn = mongoose.connection
  app.listen(port, () => {
    // tslint:disable-next-line
    !isProd && console.log(`App started at http://localhost:${port}`)
  })
})

export default app

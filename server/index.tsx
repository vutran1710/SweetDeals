import * as express from 'express'
import * as path from 'path'
import * as Loadable from 'react-loadable'
import * as mongoose from 'mongoose'
import { indexRouter, calcRouter } from './routes'

const app = express()
const port = process.env.PORT
const mongoPort = process.env.MONGO_PORT
const db = process.env.DB


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/client', express.static(path.resolve('build/client')))
app.use('/asset', express.static(path.resolve('build/asset')))

app.use(calcRouter)
app.use(indexRouter)

Loadable.preloadAll().then(() => {
  mongoose.connect(db, err => console.log(err ? err : 'Success'))
  const conn = mongoose.connection
  app.listen(port, () => {
    // tslint:disable-next-line
    console.log(`App started at http://localhost:${port}`)
  })
})

import * as express from 'express'
import * as mongoose from 'mongoose'
import * as path from 'path'
import {
  calcRouter,
  indexRouter,
} from './routes'

const app = express()
const port = process.env.PORT
const db = process.env.DB

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/client', express.static(path.resolve('build/client')))
app.use('/asset', express.static(path.resolve('build/asset')))

app.use(calcRouter)
app.use(indexRouter)

app.use((err, req, res, next) => res.status(err.code).json({ error: err.error }))

// tslint:disable-next-line
mongoose.connect(db, { useNewUrlParser: true }).catch(console.error)
const server = app.listen(port, () => {
  // tslint:disable-next-line
  console.log(`|> App started at http://localhost:${port}\n|> DB: ${db}`)
})

export default server

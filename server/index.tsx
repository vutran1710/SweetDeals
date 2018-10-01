import * as express from 'express'
import * as path from 'path'
import { indexRouter } from './routes/indexRouter'

const app = express()
const port = 3000
const isProd = process.env.NODE_ENV === 'production'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/static", express.static(path.resolve("build/asset")))
app.use(indexRouter)

let Server = app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})

// Used to restart server by fuseBox
export async function shutdown() {
  Server.close()
  Server = undefined
}

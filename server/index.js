import express from 'express'
import indexRouter from './routes/index'

const app = express()
const router = express.Router()
const port = 3000

app.use(indexRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

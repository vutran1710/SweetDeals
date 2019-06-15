import * as mongoose from 'mongoose'

const port = process.env.PORT
const db = process.env.DB
const opts = {
  useNewUrlParser: true
}

let healthcheck = false
let retries = 0
let intervalCheck

intervalCheck = setInterval(() => {
  console.log(`|> Try mongodb connect... ${db}`)

  mongoose.connect(db, opts, err => {
    if (retries > 10) {
      process.exit(1)
    }

    if (err) {
      console.log('=== Connection not ready...')
      console.debug(err)
      retries = retries + 1
    } else {
      healthcheck = true
      console.log(`|> Successful connect`)
      process.exit(0)
    }

  })
}, 6000)

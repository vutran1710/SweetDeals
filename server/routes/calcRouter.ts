import * as express from 'express'
import { ERROR_MSG } from 'common/constant'

const router = express.Router()

const calc = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b
}

router.post('/calc', (req, res) => {
  const { a, b, operand } = req.body
  if (operand in calc) {
    res.status(200).send({ result: calc[operand](a, b) })
  } else {
    res.status(400).send({ error: ERROR_MSG[0] })
  }
})

export const calcRouter = router

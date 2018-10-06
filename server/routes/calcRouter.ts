import * as express from 'express'
import { pick } from 'ramda'
import { Calculation } from '../model'
import { ERROR_MSG } from 'common/constant'
import { queryHandler } from './helper'

const router = express.Router()

const calcMatcher = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b
}

const validOperandHandler = (body, res) => Calculation.findOne(body)
  .exec(queryHandler(res, async entity => {
    if (entity) {
      const result = pick(['a', 'b', 'result'], entity)
      return res.status(200).send({ ...result, msg: 'cached' })
    }

    const { a, b, operand } = body
    const item = new Calculation({
      ...body,
      result: calcMatcher[operand](a, b),
      regTime: Date.now()
    })

    try {
      const newItem = await item.save()
      res.status(201).send(newItem)
    } catch (err) {
      res.status(500).send(err)
    }
  }))

router.post('/calc', ({ body }, res) => {
  const badRequestHandler = (bad, error) => bad && res.status(400).send({ error })

  const requiredParams = ['a', 'b', 'operand']
  requiredParams.forEach(p => badRequestHandler(!(p in body), ERROR_MSG[4]))

  const divideByZero = body.b === 0 && body.operand === 'divide'
  badRequestHandler(divideByZero, ERROR_MSG[2])

  return validOperandHandler(body, res)
})

export const calcRouter = router

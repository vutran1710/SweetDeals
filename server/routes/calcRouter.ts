import * as express from 'express'
import { pick } from 'ramda'
import { Calculation } from '@model'
import { ERROR_MSG } from '@constant'
import { queryHandler } from './helper'
import * as _ from 'common/fp'

const router = express.Router()

const calculator = {
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
      result: calculator[operand](a, b),
      regTime: Date.now()
    })

    try {
      const newItem = await item.save()
      return res.status(201).send(newItem)
    } catch (err) {
      return res.status(500).send(err)
    }
  }))

router.post('/calc', ({ body }, res) => {
  const requiredParams = ['a', 'b', 'operand']
  const missingParam = !requiredParams.every(p => p in body) && ERROR_MSG.MISSING_PARAM
  const divideByZero = body.b === 0 && body.operand === 'divide' && ERROR_MSG.INVALID_CALC
  const invalidOperand = !calculator[body.operand] && ERROR_MSG.UNSUPORTED
  const error = missingParam || divideByZero || invalidOperand

  const handler = _.matcher({
    true: () => res.status(400).send({ error }),
    _: () => validOperandHandler(body, res)
  })

  return handler(!!error)
})

export const calcRouter = router

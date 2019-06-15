import { ERROR_MSG } from '@constant'
import { Calculation } from '@model'
import * as express from 'express'
import { pick } from 'ramda'
import {
  debug,
  handleException,
  ThrowOn,
} from './helper'

const router = express.Router()

export const calculator = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b
}

export const POST_CALCULATION = async ({ body }, res) => {
  const requiredParams = ['a', 'b', 'operand']

  const {
    MISSING_PARAM,
    INVALID_CALC,
    UNSUPORTED,
  } = ERROR_MSG

  const mustHaveEnoughParams = requiredParams.every(p => p in body)
  ThrowOn(mustHaveEnoughParams, { code: 400, error: MISSING_PARAM })

  const mustNotDividedByZero = !(body.b === 0 && body.operand === 'divide')
  ThrowOn(mustNotDividedByZero, { code: 400, error: INVALID_CALC })

  const mustBeValidOperand = calculator[body.operand]
  ThrowOn(mustBeValidOperand, { code: 400, error: UNSUPORTED })

  const memoized = await Calculation.findOne(body)

  if (memoized) {
    const result = pick(['a', 'b', 'result', '_id'], memoized)
    return res.status(200).send({ ...result, msg: 'memoized' })
  }

  const item = await Calculation.create({
    ...body,
    result: calculator[body.operand](body.a, body.b),
    regTime: Date.now()
  })

  return res.status(201).send(item)
}

router.post('/calc', handleException(POST_CALCULATION))
export const calcRouter = router

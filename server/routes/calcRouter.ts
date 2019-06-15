import * as express from 'express'
import { pick } from 'ramda'
import { Calculation } from '@model'
import { ERROR_MSG } from '@constant'
import { catcher, handleException, ThrowOn } from './helper'

const router = express.Router()

export const calculator = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b
}

const POST_CALCULATION = async ({ body }, res) => {
  const requiredParams = ['a', 'b', 'operand']

  const missingParam = !requiredParams.every(p => p in body) && ERROR_MSG.MISSING_PARAM
  const divideByZero = body.b === 0 && body.operand === 'divide' && ERROR_MSG.INVALID_CALC
  const invalidOperand = !calculator[body.operand] && ERROR_MSG.UNSUPORTED
  const error = missingParam || divideByZero || invalidOperand
  ThrowOn(error, { code: 400, error })

  const [dbErr, memoized] = await catcher(Calculation.findOne(body))
  ThrowOn(dbErr, { code: 500, error: ERROR_MSG.DB_ERR })

  if (memoized) {
    const result = pick(['a', 'b', 'result'], memoized)
    return res.status(200).send({ ...result, msg: 'cached' })
  }

  const item = new Calculation({
    ...body,
    result: calculator[body.operand](body.a, body.b),
    regTime: Date.now()
  })

  const [saveErr, newItem] = await catcher(item.save())
  ThrowOn(saveErr, { code: 400, error: ERROR_MSG.DB_SAVE_ERR })
  return res.status(201).send(newItem)
}

router.post('/calc', handleException(POST_CALCULATION))
export const calcRouter = router

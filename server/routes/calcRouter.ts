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

router.post('/calc', (req, res) => {
  if (req.body.operand in calcMatcher) {
    return validOperandHandler(req.body, res)
  }
  return res.status(400).send({ error: ERROR_MSG[0] })
})

export const calcRouter = router

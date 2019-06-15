import { model, Schema } from 'mongoose'

const CalculationSchema = new Schema({
  operand: {
    type: 'String',
    required: true
  },
  a: {
    type: Number,
    required: true
  },
  b: {
    type: Number,
    required: true
  },
  result: {
    type: Number,
    required: true
  },
  regTime: {
    type: Date,
    required: true
  }
})

export const Calculation = model('Calculation', CalculationSchema)

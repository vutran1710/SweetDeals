import * as mongoose from 'mongoose'

export const Calculation = mongoose.Schema({
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

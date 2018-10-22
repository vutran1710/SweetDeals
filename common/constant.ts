export const OPS = {
  add: '+',
  divide: '/',
  multiply: 'x',
  subtract: '-'
}

export const ERROR_MSG = {
  INVALID_CALC: 'Invalid Calculation',
  MISSING_PARAM: 'Missing Params',
  UNSUPORTED: 'Unsupported request',
  SERVER_ERROR: 'Server Error',
  DB_ERR: 'Cannot connect to database',
  DB_SAVE_ERR: 'Cannot save to database'
}

export const DEFAULT_STATE = {
  a: '0',
  b: '0',
  activeValue: 'a',
  display: '0',
  operand: null
}

import { ERROR_MSG } from '@constant'

const error = ERROR_MSG.DB_ERR

export const queryHandler = (res, entityHandler) => (err, entity) => {
  if (err) {
    return res.status(500).send({ error })
  }
  return entityHandler(entity)
}

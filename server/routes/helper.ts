import { ERROR_MSG } from 'common/constant'

const error = ERROR_MSG[3]

export const queryHandler = (res, entityHandler) => (err, entity) => {
  if (err) {
    return res.status(500).send({ error })
  }
  return entityHandler(entity)
}

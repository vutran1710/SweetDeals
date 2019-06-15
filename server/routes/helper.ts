export const catcher = promise => promise
  .then(data => [null, data])
  .catch(err => [err])

export const handleException = fn => (req, res, next) => fn(req, res).catch(next)

export const ThrowOn = (condition, msg) => {
  if (!condition) {
    throw new Error(msg)
  }
}

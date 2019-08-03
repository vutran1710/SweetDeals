export const handleException = fn => (req, res, next) => fn(req, res).catch(next)

export const ThrowOn = (condition, msg) => {
  if (!condition) {
    throw msg
  }
}

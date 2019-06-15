export const handleException = fn => (req, res, next) => fn(req, res).catch(next)

export const ThrowOn = (condition, msg) => {
  if (!condition) {
    throw msg
  }
}

export const debug = str => {
  // NOTE: reseve for logging
  // tslint:disable-next-line
  console.log(str)
}

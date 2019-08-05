const FixingAPI = endpoint => process.env.NODE_ENV === 'production' ? endpoint : `${process.env.ORIGIN}/${endpoint}`

const BaseApi = {
  calc: '/calc'
}

const Api = Object.keys(BaseApi).reduce((obj, key) => ({
  ...obj,
  [key]: FixingAPI(BaseApi[key]),
}), {})

export default Api

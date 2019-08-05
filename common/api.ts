const FixingAPI = endpoint => process.env.NODE_ENV === 'production' ? endpoint : `${process.env.ORIGIN}/${endpoint}`

const BaseApi = {
  calc: '/calc'
}

const Api = Object.keys(BaseApis).reduce((obj, key) => ({
  ...obj,
  [key]: FixingAPI(BaseApis[key]),
}), {})

export default Api

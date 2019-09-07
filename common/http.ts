import wretch from 'wretch'

const Api = {
  calc: '/calc',
}

const http = {
  calculate: payload => wretch(process.env.ORIGIN + Api.calc).post(payload).json()
}

export default http

const FixingAPI = endpoint => process.env.NODE_ENV === 'production' ? endpoint : `${process.env.ORIGIN}/${endpoint}`

const Api = {
  calc: FixingAPI('/calc'),
}

const genericHandler = resp => {
  if (!resp.ok) {
    throw resp.json()
  }
  return resp.json()
}

export const calculate = payload => fetch(Api.calc, {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-Type': 'application/json',
  }
}).then(genericHandler)

import { renderToString } from 'react-dom/server'

const Index = () => (
  <div>
    <h2>Hello World</h2>
    <a href="/calc">Click to open calculator</a>
  </div>
)

export default renderToString(Index)

import { render } from 'react-dom'
import Calculator from '@container/Calculator'

const App = () => (
  <div>
    <h2>Hello World</h2>
    <Calculator />
  </div>
)

const mountPoint = document.getElementById('root')

render(<App />, mountPoint)

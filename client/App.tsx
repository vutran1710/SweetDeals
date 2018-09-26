import { render } from 'react-dom'
import Calculator from '@container/Calculator'
import '@style/app.scss'

const App = () => (
  <div>
    <Calculator />
  </div>
)

const mount = document.getElementById('root')
render(<App />, mount)

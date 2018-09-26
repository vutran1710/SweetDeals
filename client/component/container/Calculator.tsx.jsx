import { OPS, ERROR_MSG, DEFAULT_STATE } from '@constant'

class Calculator extends React.Component {
  state = DEFAULT_STATE

  setOperand = operand => () => this.state.activeValue === 'a' && this.setState({
    operand,
    activeValue: 'b',
    display: '0',
  })

  appendValue = btn => () => {
    const { activeValue, display } = this.state
    const displayUgly = this.state[activeValue] === '0' || ERROR_MSG.includes(display)
    const val = displayUgly ? btn : display + btn
    this.setState({ [activeValue]: val, display: val })
  }

  changeSign = () => {
    const { activeValue } = this.state
    const currentNumber = this.state[activeValue]
    if (currentNumber === '0') return
    const val = currentNumber[0] === '-' ? currentNumber.slice(1) : `-${currentNumber}`
    this.setState({ [activeValue]: val, display: val })
  }

  reset = () => this.setState(DEFAULT_STATE)

  submit = () => {
    const serverResponseHandler = (res) => {
      if (res.error) {
        throw res.error
      }
      if (res.result === null) {
        throw ERROR_MSG[2]
      }
      const display = res.result.toFixed(4)
      this.setState({ ...DEFAULT_STATE, display })
    }

    const errorHandler = display => this.setState({
      ...DEFAULT_STATE,
      display: typeof display === 'string' ? display : ERROR_MSG[1],
    })

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        a: parseInt(this.state.a, 10),
        b: parseInt(this.state.b, 10),
        operand: this.state.operand,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const url = 'http://localhost:3000/calc'

    fetch(url, requestOptions)
      .then(resp => resp.json())
      .then(serverResponseHandler)
      .catch(errorHandler)
  }

  render() {
    const {
      appendValue, setOperand, submit, reset, changeSign, state,
    } = this
    const subDisplay = `${state.a || ''} ${OPS[state.operand] || ''} ${state.b || ''}`
    return (
      <div className="container">
        <div className="calc-body">
          <div className="calc-screen mini">
            <div className="calc-typed">{subDisplay}</div>
          </div>
          <div className="calc-screen">
            <div className="calc-typed">{this.state.display}</div>
          </div>
          <div className="calc-button-row">
            <div className="button c" onClick={reset}>AC</div>
            <div className="button l" onClick={changeSign}>+/-</div>
            <div className="button l" onClick={setOperand('percent')}>%</div>
            <div className="button l" onClick={setOperand('divide')}>/</div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={appendValue('7')}>7</div>
            <div className="button" onClick={appendValue('8')}>8</div>
            <div className="button" onClick={appendValue('9')}>9</div>
            <div className="button l" onClick={setOperand('multiply')}>x</div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={appendValue('4')}>4</div>
            <div className="button" onClick={appendValue('5')}>5</div>
            <div className="button" onClick={appendValue('6')}>6</div>
            <div className="button l" onClick={setOperand('subtract')}>−</div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={appendValue('1')}>1</div>
            <div className="button" onClick={appendValue('2')}>2</div>
            <div className="button" onClick={appendValue('3')}>3</div>
            <div className="button l" onClick={setOperand('add')}>+</div>
          </div>
          <div className="calc-button-row">
            <div className="button half" onClick={appendValue('0')}>0</div>
            <div className="button">.</div>
            <div className="button l" onClick={submit}>=</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator

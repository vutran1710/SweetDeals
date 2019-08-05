import Apis from '@api'
import {
  DEFAULT_STATE,
  ERROR_MSG,
  OPS,
} from '@constant'
import * as React from 'react'

export class Calculator extends React.Component {
  state = DEFAULT_STATE

  setOperand = operand => () => this.state.activeValue === 'a' && this.setState({
    operand,
    activeValue: 'b',
    display: '0'
  })

  appendValue = btn => () => {
    const { activeValue, display } = this.state
    const displayUgly = (
      this.state[activeValue] === '0' ||
      Object.values(ERROR_MSG).includes(display)
    )
    const val = displayUgly ? btn : display + btn
    this.setState({ [activeValue]: val, display: val })
  }

  changeSign = () => {
    const { activeValue } = this.state
    const currentNumber = this.state[activeValue]
    if (currentNumber === '0') {
      return
    }
    const val = currentNumber[0] === '-' ? currentNumber.slice(1) : `-${currentNumber}`
    this.setState({ [activeValue]: val, display: val })
  }

  reset = () => this.setState(DEFAULT_STATE)

  submit = () => {
    const serverResponseHandler = res => {
      if (res.error) {
        throw res.error
      }
      if (res.result === null) {
        throw ERROR_MSG.SERVER_ERROR
      }
      const display = res.result.toFixed(4)
      this.setState({ ...DEFAULT_STATE, display })
    }

    const errorHandler = display => this.setState({
      ...DEFAULT_STATE,
      display: typeof display === 'string' ? display : ERROR_MSG.SERVER_ERROR
    })

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        a: parseInt(this.state.a, 10),
        b: parseInt(this.state.b, 10),
        operand: this.state.operand
      }),
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(Apis.calc, requestOptions)
      .then(resp => resp.json())
      .then(serverResponseHandler)
      .catch(errorHandler)
  }

  render() {
    const { a, b, operand, display } = this.state
    const subDisplay = `${a || ''} ${OPS[operand] || ''} ${b || ''}`
    return (
      <div className="container">
        <div className="calc-body">
          <div className="calc-screen mini">
            <div className="calc-typed">{subDisplay}</div>
          </div>
          <div className="calc-screen">
            <div className="calc-typed">{display}</div>
          </div>
          <div className="calc-button-row">
            <div className="button c" onClick={this.reset}>AC</div>
            <div className="button l" onClick={this.changeSign}>+/-</div>
            <div className="button l" onClick={this.setOperand('percent')}>%</div>
            <div className="button l" onClick={this.setOperand('divide')}>/</div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={this.appendValue('7')}>7</div>
            <div className="button" onClick={this.appendValue('8')}>8</div>
            <div className="button" onClick={this.appendValue('9')}>9</div>
            <div className="button l" onClick={this.setOperand('multiply')}>x</div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={this.appendValue('4')}>4</div>
            <div className="button" onClick={this.appendValue('5')}>5</div>
            <div className="button" onClick={this.appendValue('6')}>6</div>
            <div className="button l" onClick={this.setOperand('subtract')}>−</div>
          </div>
          <div className="calc-button-row">
            <div className="button" onClick={this.appendValue('1')}>1</div>
            <div className="button" onClick={this.appendValue('2')}>2</div>
            <div className="button" onClick={this.appendValue('3')}>3</div>
            <div className="button l" onClick={this.setOperand('add')}>+</div>
          </div>
          <div className="calc-button-row">
            <div className="button half" onClick={this.appendValue('0')}>0</div>
            <div className="button">.</div>
            <div className="button l" onClick={this.submit}>=</div>
          </div>
        </div>
      </div>
    )
  }
}

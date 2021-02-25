import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='outer'>
        <div className='middle'>
          <Calculator className = 'inner'/>
        </div>
      </div>
    </div>
  );
}


class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display1: '0',
      display2: '0',
      result: '0',
      resultFinal: 0,
      decimalTrue: true,
      zeroTrue: true,
      operatorTrue: false,
      isNumber: true,
      improvedDisp: '',
      abunai: false,
      lol : '0'
    }
    this.handleKeydown = this.handleKeydown.bind(this)
    this.iClicked = this.iClicked.bind(this)
    this.checkDecimal = this.checkDecimal.bind(this)
    this.checkZero = this.checkZero.bind(this)
    this.checkOperator = this.checkOperator.bind(this)
    this.checkIsNum = this.checkIsNum.bind(this)
    this.writetoDisp = this.writetoDisp.bind(this)
    this.evalDisp = this.evalDisp.bind(this)
  }



  writetoDisp() {
    if (this.state.display2 !== '' && this.state.display2 !== '0' && this.state.display2[0] !== '=') {
      var test = this.state.display1 + this.state.display2.slice(-1)
      var newTest, newerTest

      if (test.length > 1 && test[0] === '0' && test[1] !== '.' && test[1] !== '+' && test[1] !== '-' && test[1] !== '*' && test[1] !== '/') {
        newTest = test.replace('0', '')
      }
      else {
        newTest = test
      }

      const rxForplusmin = /\+-/g
      const rxForplusmul = /\+\*/g
      const rxForplusdiv = /\+\//g
      const rxForminplus = /-\+/g
      const rxForminmul = /-\*/g
      const rxFormindiv = /-\//g
      const rxFormulplus = /\*\+/g
      const rxFormuldiv = /\*\//g
      const rxFordivplus = /\/\+/g
      const rxFordivmul = /\/\*/g
      const rxDMul = /\.\*/g
      const rxDPlus = /\.\+/g
      const rxDDiv = /\.\//g
      const rxDMin = /\.-/g
      const rxDoubleDiv = /\/\//g
      const rxDoubleMul = /\*\*/g
      newerTest = newTest.replace(rxForplusmin, '-').replace(rxForplusmul, '*').replace(rxForplusdiv, '/').replace(rxForminplus, '+').replace(rxForminmul, '*').replace(rxFormindiv, '/').replace(rxFormulplus, '+').replace(rxFormuldiv, '/').replace(rxFordivplus, '+').replace(rxFordivmul, '*').replace(rxDDiv, '/').replace(rxDMin, '-').replace(rxDMul, '*').replace(rxDPlus, '+').replace(rxDoubleDiv, '/').replace(rxDoubleMul, '*')

      this.setState((state) => ({
        display1: newerTest
      }))
    }
    else if (this.state.display2[0] === '=') {
      var nextDisp = this.state.display1+this.state.display2

      this.setState((state) =>
      ({
        display1: nextDisp}))
    }

    if (this.state.abunai) {
      const rxForabunai = /^[^=]*=/
      var resultAbunai = this.state.display1.replace(rxForabunai, '')
      this.setState(() => ({
        display1: resultAbunai,
        abunai: false,
      }))
    }

  }

  evalDisp() {
    if (this.state.display2[0] === '=') {
      const rxForEquals = /=/g
      const rxForEval = /.+=(.+)$/g
      var toBeEval
      if(rxForEquals.test(this.state.display1)){
        var arr = rxForEval.exec(this.state.display1)
        toBeEval = arr[1]
      }
      
      else{
        toBeEval = this.state.display1
      }
      // eslint-disable-next-line no-eval
      var solution = eval(toBeEval)
      var replaceSolution = Number(Math.round(solution+'e'+9)+'e-'+9).toString()
      var noEqualSolution = replaceSolution.replace('=','')
      this.setState((state) => (
        {
          display2: `=${replaceSolution}`,
          lol : noEqualSolution
        }
      ))
    }
    else{
      this.setState((state)=>({
        lol: state.display2
      }))
    }
  }

  handleKeydown(e) {
    switch (e.keyCode) {
      case 13:
        this.equalsBtn.click()
        break
      case 48:
        this.zeroBtn.click()
        break
      case 49:
        this.oneBtn.click()
        break
      case 50:
        this.twoBtn.click()
        break
      case 51:
        this.threeBtn.click()
        break
      case 52:
        this.fourBtn.click()
        break
      case 53:
        this.fiveBtn.click()
        break
      case 54:
        this.sixBtn.click()
        break
      case 55:
        this.sevenBtn.click()
        break
      case 56:
        this.eightBtn.click()
        break
      case 57:
        this.nineBtn.click()
        break
      case 190:
        this.decimalBtn.click()
        break
      case 65:
        this.addBtn.click()
        break
      case 83:
        this.subtractBtn.click()
        break
      case 68:
        this.multiplyBtn.click()
        break
      case 70:
        this.divideBtn.click()
        break
      case 81:
        this.clearBtn.click()
        break
      default:
        break
    }
  }

  checkDecimal(stringGoesHere) {
    var str = stringGoesHere;
    var patt = new RegExp("[.]");
    var res = patt.test(str);
    if (this.state.display2 === '') {
      this.setState(() => ({ decimalTrue: true }))
    }
    else {
      this.setState(() => ({ decimalTrue: res }))
    }
  }

  checkOperator() {
    if (this.state.display2 === '+' || this.state.display2 === '-' || this.state.display2 === '/' || this.state.display2 === '*' || this.state.display2 === '*-' || this.state.display2 === '/-') {
      this.setState(() => ({ operatorTrue: true }))
    }
    else {
      this.setState(() => ({ operatorTrue: false }))
    }
  }

  checkZero() {
    if (this.state.display2 === '0') {
      this.setState(() => ({ zeroTrue: true }))
    }
    else {
      this.setState(() => ({ zeroTrue: false }))
    }
  }

  checkIsNum() {
    var str = this.state.display2;
    var patt = new RegExp("[0-9]");
    var res = patt.test(str);
    if (this.state.display2 === '') {
      this.setState(() => ({ isNumber: false }))
    }
    else {
      this.setState(() => ({ isNumber: res }))
    }
  }


  iClicked(id) {
    if (this.state.operatorTrue === false && this.state.zeroTrue === false && this.state.display2[0] !== '=') {
      switch (id) {
        case 'equals':
          this.setState(() => ({ display2: `=${this.state.apasih}`, abunai: true }))
          break;

        case 'zero':
          this.setState(() => ({ display2: `${this.state.display2}0` }))
          break;

        case 'one':
          this.setState(() => ({ display2: `${this.state.display2}1` }))
          break;

        case 'two':
          this.setState(() => ({ display2: `${this.state.display2}2` }))
          break;

        case 'three':
          this.setState(() => ({ display2: `${this.state.display2}3` }))
          break;

        case 'four':
          this.setState(() => ({ display2: `${this.state.display2}4` }))
          break;

        case 'five':
          this.setState(() => ({ display2: `${this.state.display2}5` }))
          break;

        case 'six':
          this.setState(() => ({ display2: `${this.state.display2}6` }))
          break;

        case 'seven':
          this.setState(() => ({ display2: `${this.state.display2}7` }))
          break;

        case 'eight':
          this.setState(() => ({ display2: `${this.state.display2}8` }))
          break;

        case 'nine':
          this.setState(() => ({ display2: `${this.state.display2}9` }))
          break;

        case 'clear':
          this.setState(() => ({ display2: '0', display1: '0', result: '0' }))
          break;

        case 'add':
          this.setState(() => ({ display2: '+' }))
          break;

        case 'subtract':
          this.setState(() => ({ display2: '-' }))
          break;

        case 'divide':
          this.setState(() => ({ display2: '/' }))
          break;

        case 'multiply':
          this.setState(() => ({ display2: '*' }))
          break;

        case 'decimal':
          if (this.state.decimalTrue === false)
            this.setState(() => ({ display2: `${this.state.display2}.` }))
          break;
        default:
          break;
      }
    }
    else if (this.state.display2[0] === '=') {
      switch (id) {
        case 'zero':
          this.setState(() => ({ display2: `0`, display1: `0` }))
          break;

        case 'one':
          this.setState(() => ({ display2: `1`, display1: `` }))
          break;

        case 'two':
          this.setState(() => ({ display2: `2`, display1: `` }))
          break;

        case 'three':
          this.setState(() => ({ display2: `3`, display1: `` }))
          break;

        case 'four':
          this.setState(() => ({ display2: `4`, display1: `` }))
          break;

        case 'five':
          this.setState(() => ({ display2: `5`, display1: `` }))
          break;

        case 'six':
          this.setState(() => ({ display2: `6`, display1: `` }))
          break;

        case 'seven':
          this.setState(() => ({ display2: `7`, display1: `` }))
          break;

        case 'eight':
          this.setState(() => ({ display2: `8`, display1: `` }))
          break;

        case 'nine':
          this.setState(() => ({ display2: `9`, display1: ``}))
          break;

        case 'add':
          this.setState(() => ({ display2: `+` }))
          break
        case 'subtract':
          this.setState(() => ({ display2: `-` }))
          break
        case 'multiply':
          this.setState(() => ({ display2: `*` }))
          break
        case 'divide':
          this.setState(() => ({ display2: `/` }))
          break
        case 'clear':
          this.setState(() => ({ display2: `0`, display1: `0`}))
          break
        default:
          break
      }
    }
    else {
      switch (id) {

        case 'zero':
          this.setState(() => ({ display2: `0` }))
          break;

        case 'one':
          this.setState(() => ({ display2: `1` }))
          break;

        case 'two':
          this.setState(() => ({ display2: `2` }))
          break;

        case 'three':
          this.setState(() => ({ display2: `3` }))
          break;

        case 'four':
          this.setState(() => ({ display2: `4` }))
          break;

        case 'five':
          this.setState(() => ({ display2: `5` }))
          break;

        case 'six':
          this.setState(() => ({ display2: `6` }))
          break;

        case 'seven':
          this.setState(() => ({ display2: `7` }))
          break;

        case 'eight':
          this.setState(() => ({ display2: `8` }))
          break;

        case 'nine':
          this.setState(() => ({ display2: `9` }))
          break;

        case 'clear':
          this.setState(() => ({ display2: '0', display1: '0' }))
          break;

        case 'add':
          this.setState(() => ({ display2: '+' }))
          break;

        case 'subtract':
          if (this.state.display2 === '*' || this.state.display2 === '/') {
            this.setState(() => ({ display2: `${this.state.display2}-` }))
          }
          else { this.setState(() => ({ display2: '-' })) }

          break;

        case 'divide':
          this.setState(() => ({ display2: '/' }))
          break;

        case 'multiply':
          this.setState(() => ({ display2: '*' }))
          break;

        case 'decimal':
          if (this.state.decimalTrue === false && this.state.operatorTrue === false)
            this.setState(() => ({ display2: `${this.state.display2}.` }))
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  componentDidUpdate(prevProps, prevState) { //Why do i have to pass prevProps?
    if (prevState.display2 !== this.state.display2) {
      this.checkDecimal(this.state.display2)
      this.checkZero()
      this.checkOperator()
      this.checkIsNum()
      this.writetoDisp()
      this.evalDisp()
    }
  }

  shouldComponentUpdate

  render() {
    return (
      <div id='Calc'>
        <div id='topContainer'>
          <div id='display'>{this.state.lol}</div>
          <div id='displayTop'>{this.state.display1}</div>
        </div>
        <div id='clickablesContainer'>
          <div className='clickables' id='clear' onClick={() => (this.iClicked('clear'))} ref={node => (this.clearBtn) = node}>
            AC
          </div>
          <div className='clickables' id='equals' onClick={() => (this.iClicked('equals'))} ref={node => (this.equalsBtn = node)}>
            =
          </div>
          <div className='clickables' id='zero' onClick={() => (this.iClicked('zero'))} ref={node => (this.zeroBtn) = node}>
            0
          </div>
          <div className='clickables' id='one' onClick={() => (this.iClicked('one'))} ref={node => (this.oneBtn) = node}>
            1
          </div>
          <div className='clickables' id='two' onClick={() => (this.iClicked('two'))} ref={node => (this.twoBtn) = node}>
            2
          </div>
          <div className='clickables' id='three' onClick={() => (this.iClicked('three'))} ref={node => (this.threeBtn) = node}>
            3
          </div>
          <div className='clickables' id='four' onClick={() => (this.iClicked('four'))} ref={node => (this.fourBtn) = node}>
            4
          </div>
          <div className='clickables' id='five' onClick={() => (this.iClicked('five'))} ref={node => (this.fiveBtn) = node}>
            5
          </div>
          <div className='clickables' id='six' onClick={() => (this.iClicked('six'))} ref={node => (this.sixBtn) = node}>
            6
          </div>
          <div className='clickables' id='seven' onClick={() => (this.iClicked('seven'))} ref={node => (this.sevenBtn) = node}>
            7
          </div>
          <div className='clickables' id='eight' onClick={() => (this.iClicked('eight'))} ref={node => (this.eightBtn) = node}>
            8
          </div>
          <div className='clickables' id='nine' onClick={() => (this.iClicked('nine'))} ref={node => (this.nineBtn) = node}>
            9
          </div>
          <div className='clickables' id='add' onClick={() => (this.iClicked('add'))} ref={node => (this.addBtn) = node}>
            +
          </div>
          <div className='clickables' id='subtract' onClick={() => (this.iClicked('subtract'))} ref={node => (this.subtractBtn) = node}>
            -
          </div>
          <div className='clickables' id='multiply' onClick={() => (this.iClicked('multiply'))} ref={node => (this.multiplyBtn) = node}>
            *
          </div>
          <div className='clickables' id='divide' onClick={() => (this.iClicked('divide'))} ref={node => (this.divideBtn) = node}>
            /
          </div>
          <div className='clickables' id='decimal' onClick={() => (this.iClicked('decimal'))} ref={node => (this.decimalBtn) = node}>
            .
          </div>
        </div>
        <div id='sementara'>(+) - A | (-) - S | (*) - D | (/) - F | Clear - Q | Calculate - Enter <br></br>
        <div id='displayZ'>{this.state.display2}</div> </div>
      </div>
    )
  }
}

export default App;

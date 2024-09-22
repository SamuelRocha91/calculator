import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [state, setState] = useState({
    inputOperation: '0',
    lastInput: '',
  });

  const changeStateForInputOperator = (value) => {
    const arrayInputCharacter = state.inputOperation.split('');
    const IsTheLastCharacterAnOperator = arrayInputCharacter[arrayInputCharacter.length - 1].match(/[-+*/]/) != null;
    const IsThePenultimateCharacterAnOperator = arrayInputCharacter.length > 1
      ? arrayInputCharacter[arrayInputCharacter.length - 2].match(/[+*/]/) != null
      : false;

    if (
      IsThePenultimateCharacterAnOperator
      && IsTheLastCharacterAnOperator
      && value === '-'
    ) {
      arrayInputCharacter.pop();
      arrayInputCharacter.push(value);
    } else if (IsThePenultimateCharacterAnOperator && IsTheLastCharacterAnOperator) {
      arrayInputCharacter.pop();
      arrayInputCharacter.pop();
      arrayInputCharacter.push(value);
    } else if (IsTheLastCharacterAnOperator && value !== '-') {
      arrayInputCharacter.pop();
      arrayInputCharacter.push(value);
    } else {
      arrayInputCharacter.push(value);
    }
    setState({ inputOperation: `${arrayInputCharacter.join('')}`, lastInput: value });
  };
  const handleClick = (e) => {
    const value = e.target.innerText;
    const isDot = e.target.id === 'decimal';

    const arrayOfCalculation = state.inputOperation.split(/[-+*/]/);
    const length = arrayOfCalculation.length - 1;

    if (isDot && arrayOfCalculation[length].includes('.')) {
      Swal.fire('It is not allowed to type period twice in the same number');
    } else if (
      arrayOfCalculation[length].length === 1
      && arrayOfCalculation[0] === '0'
      && !isDot
    ) {
      setState({ inputOperation: value, lastInput: value });
    } else if (value.match(/[-+*/]/) != null) {
      changeStateForInputOperator(value);
    } else if (value === '=') {
      setState({ inputOperation: `${evaluate(state.inputOperation)}`, lastInput: value });
    } else if (state.lastInput === '=') {
      if (value === '.') {
        setState({ inputOperation: `${state.inputOperation}.`, lastInput: value });
      } else {
        setState({ inputOperation: value, lastInput: value });
      }
    } else {
      setState(({ inputOperation: `${state.inputOperation}${value}`, lastInput: value }));
    }
  };

  const clearInput = () => {
    setState({
      inputOperation: '0',
      lastInput: '0',
    });
  };
  return (
    <div id="page">
      <div id='calculator'>
        <div>
          <section className='displayArea'>
            <p id="display">{ state.inputOperation }</p>
          </section>
        </div>
        <div>
          <input
            value={state.inputOperation}
            name="inputOperation"
            type="text"
          />
        </div>
        <section >
            <div id="btn-number" onClick={handleClick}>
              <button id="nine">9</button>
              <button id="eight">8</button>
              <button id="seven">7</button>
              <button id="six">6</button>
              <button id="five">5</button>
              <button id="four">4</button>
              <button id="three">3</button>
              <button id="two">2</button>
              <button id="one">1</button>
              <button id="zero">0</button>
              <button id="decimal">.</button>
              <button id="equals">=</button>
            </div>
            <div id='btn-operator'>
              <button onClick={clearInput} id="clear">CE</button>
              <button onClick={handleClick} id="multiply">*</button>
              <button onClick={handleClick} id='subtract'>-</button>
              <button onClick={handleClick} id="divide">/</button>
              <button onClick={handleClick} id="add">+</button>
            </div>
        </section>
      </div>
    </div>
  );
}

export default App;

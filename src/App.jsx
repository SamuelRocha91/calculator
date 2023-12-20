import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    inputOperation: '0',
    result: '0',
  });

  const handleClick = (e) => {
    const value = e.target.innerText;
    const isDot = e.target.id === 'decimal';
    let arrayOfInput = null;
    arrayOfInput = state.inputOperation.split(/[-+*/]/);
    const length = arrayOfInput.length - 1;
    if (isDot && arrayOfInput[length].includes('.')) {
    // eslint-disable-next-line no-else-return
    } else if (arrayOfInput[length].length === 1 && arrayOfInput[length] === '0' && !isDot) {
      const newInputOperation = `${state.inputOperation.slice(0, -1)}${value}`;
      setState((prevState) => ({ ...prevState, inputOperation: newInputOperation }));
    } else if (value.match(/[-+*/]/) != null) {
      const arratTotal = state.inputOperation.split('');
      const isOperator = arratTotal[arratTotal.length - 1].match(/[-+*/]/) != null;
      const isOperator2 = arratTotal.length > 1 ? arratTotal[arratTotal.length - 2].match(/[+*/]/) != null : false;
      if (isOperator2 && isOperator && value === '-') {
        arratTotal.pop();
        arratTotal.push(value);
      } else if (isOperator2 && isOperator) {
        arratTotal.pop();
        arratTotal.pop();
        arratTotal.push(value);
      } else if (isOperator && value !== '-') {
        arratTotal.pop();
        arratTotal.push(value);
      } else {
        arratTotal.push(value);
      }

      setState((prevState) => ({ ...prevState, inputOperation: `${arratTotal.join('')}` }));
    } else if (value === '=') {
      // eslint-disable-next-line no-eval, padded-blocks
      setState((prevState) => ({ ...prevState, inputOperation: `${eval(prevState.inputOperation)}` }));
    } else {
      setState((prevState) => ({ ...prevState, inputOperation: `${prevState.inputOperation}${value}` }));
    }
  };

  const clearInput = () => {
    setState({
      inputOperation: '0',
      result: '0',
      first: true,
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

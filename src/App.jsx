import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    inputOperation: '0',
    first: true,
  });
  const handleClick = (event) => {
    if (state.first) {
      setState({ inputOperation: event.target.innerText, first: false });
    } else {
      setState((prevState) => ({
        ...prevState,
        inputOperation: `${prevState.inputOperation}${event.target.innerText}`,
      }));
    }
  };

  const clearInput = () => {
    setState({
      inputOperation: '0',
      first: true,
    });
  };
  return (
    <div>
      <div>
        <p id="display"></p>
        <input
          value={state.inputOperation}
          name="inputOperation"
          type="text"
        />
      </div>
      <div onClick={handleClick}>
        <button id="add">+</button>
        <button id="subtract">-</button>
        <button id="divide">/</button>
        <button id="multiply">*</button>
        <button id="decimal">.</button>
        <button id="zero">0</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
      </div>
      <div>
        <button id="equals">=</button>
        <button onClick={clearInput} id="clear">CE</button>
      </div>
    </div>
  );
}

export default App;

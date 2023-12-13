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
    <div id="page">
      <div id='calculator'>
        <div>
          <section className='displayArea'>
            <p id="display"></p>
          </section>
        </div>
        <div onClick={handleClick}>
          <input
            value={state.inputOperation}
            name="inputOperation"
            type="text"
          />
        </div>
        <section>
            <div>
              <button id="add">9</button>
              <button id="subtract">8</button>
              <button id="divide">7</button>
              <button id="multiply">6</button>
              <button id="decimal">5</button>
              <button id="zero">4</button>
              <button id="one">3</button>
              <button id="two">2</button>
              <button id="three">1</button>
              <button id="four">0</button>
              <button id="five">.</button>
              <button id="equals">=</button>
            </div>
            <div>
              <button onClick={clearInput} id="clear">CE</button>
              <button id="six">*</button>
              <button>-</button>
              <button>/</button>
            </div>
        </section>
      </div>
    </div>
  );
}

export default App;

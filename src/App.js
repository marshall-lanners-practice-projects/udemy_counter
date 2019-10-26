import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const upCount = e => {
    e.preventDefault();
    setCount(count + 1);
  };

  return (
    <div data-test='component-app'>
      <h1>The Count is {count}</h1>
      <button onClick={upCount}>up count</button>
    </div>
  );
}

export default App;

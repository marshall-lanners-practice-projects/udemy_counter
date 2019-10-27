import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: ''
    };
  }

  handleChange = val => {
    if (val + this.state.counter === -1) {
      this.setState({ error: "you can't go below 0" });
    } else {
      this.setState({
        counter: this.state.counter + val,
        error: ''
      });
    }
  };

  render() {
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The Count is {this.state.counter}</h1>
        <h2 data-test='error-display'>{this.state.error}</h2>
        <button
          data-test='increment-button'
          onClick={() => this.handleChange(1)}
        >
          up count
        </button>
        <button
          data-test='decrement-button'
          onClick={() => this.handleChange(-1)}
        >
          down count
        </button>
      </div>
    );
  }
}

export default App;

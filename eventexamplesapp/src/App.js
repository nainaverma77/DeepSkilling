import React, { Component } from 'react';
import './App.css';
import CurrencyConvertor from './CurrencyConvertor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 5
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.sayWelcome = this.sayWelcome.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  incrementCounter() {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  }

  sayHello() {
    alert("Hello! Member1");
  }

  handleIncrement() {
    this.incrementCounter();
    this.sayHello();
  }

  handleDecrement() {
    this.setState(prevState => ({ counter: prevState.counter - 1 }));
  }

  sayWelcome(message) {
    alert(message);
  }

  handlePress(event) {
    alert("I was clicked");
  }

  render() {
    return (
      <div style={{ padding: '10px', fontFamily: 'sans-serif' }}>
        <div>{this.state.counter}</div>
        <br />
        <div>
          <button onClick={this.handleIncrement}>Increment</button>
        </div>
        <div>
          <button onClick={this.handleDecrement}>Decrement</button>
        </div>
        <div>
          <button onClick={() => this.sayWelcome('welcome')}>Say welcome</button>
        </div>
        <div>
          <button onClick={this.handlePress}>Click on me</button>
        </div>
        <br />
        <CurrencyConvertor />
      </div>
    );
  }
}

export default App;

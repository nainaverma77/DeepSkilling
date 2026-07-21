import React, { Component } from 'react';

class CurrencyConvertor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      currency: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const amountVal = Number(this.state.amount);
    const convertedAmount = amountVal * 80;
    alert(`Converting to Euro Amount is ${convertedAmount}`);
  }

  render() {
    return (
      <div>
        <h1 style={{ color: 'green' }}>Currency Convertor!!!</h1>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Amount:</td>
                <td>
                  <input
                    type="text"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Currency:</td>
                <td>
                  <textarea
                    name="currency"
                    value={this.state.currency}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CurrencyConvertor;

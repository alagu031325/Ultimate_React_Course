import React from "react";

class Counter extends React.Component {
  //similar to function body that returns some JSX in React 18 - hooks are only for function components not for class components

  constructor(props) {
    super(props);
    //state declarations - since this method is called when each object is instantiated
    this.state = {
      count: 5,
    };
    //binding this keyword to the event handler functions
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  // All event handlers will lose their binding to 'this' keyword as they are called by React as a normal function
  handleDecrement() {
    this.setState(curState => {
      return { count: curState.count - 1 };
    });
  }

  handleIncrement() {
    this.setState(curState => {
      return { count: curState.count + 1 };
    });
  }

  render() {
    //simple logics are allowed not functions
    const date = new Date("march 02 2025");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>{date.toDateString()}</span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;

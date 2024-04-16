import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + counter);

  function handleMinus(s) {
    if (s === "counter") {
      setCounter((c) => c - step);
    } else {
      if (step > 1) setStep((s) => s - 1);
    }
  }

  function handlePlus(s) {
    if (s === "counter") {
      setCounter((c) => c + step);
    } else setStep((s) => s + 1);
  }

  return (
    <>
      <div>
        <button className="minus" onClick={() => handleMinus("step")}>
          -
        </button>
        <span>Step: {step}</span>
        <button className="add" onClick={() => handlePlus("step")}>
          +
        </button>
      </div>
      <div>
        <button className="minus" onClick={() => handleMinus("counter")}>
          -
        </button>
        <span>Counter: {counter}</span>
        <button className="add" onClick={() => handlePlus("counter")}>
          +
        </button>
      </div>
      <div>
        <span>
          {counter === 0
            ? "Today is "
            : counter > 0
            ? `${counter}
        days from today is `
            : `${Math.abs(counter)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </div>
    </>
  );
}

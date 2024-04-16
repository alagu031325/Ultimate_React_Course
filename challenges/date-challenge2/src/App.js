import { useState } from "react";
import "./index.css";

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

  function handleReset() {
    setCounter(0);
    setStep(1);
  }

  // The two input elements are now controlled elements by React
  return (
    <div>
      <div>
        <input type='range' min='1' max='10' value={step} onChange={(e)=>setStep(Number(e.target.value))} />{step}
       
      </div>
      <div>
        <button className="minus" onClick={()=> setCounter((c) => c - step)}>
          -
        </button>
        <input type='text' value={counter} onChange={(e)=> setCounter(Number(e.target.value))} />
        <button className="add" onClick={()=> setCounter((c) => c + step)}>
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

      {(counter !== 0 || step !== 1) ? <div>
        <button onClick={handleReset}>Reset</button>
      </div> : null}
    </div>
  );
}

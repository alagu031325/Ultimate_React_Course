import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 10000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <div>
      <h1>Slow Counter?!?</h1>
      <Counter>
        {/* this component is already been created and passed as children prop before the counter component is rendered - so react is smart enough to know that nothing could have changed inside of this component since it is already created and doesnt re-render it as in case of Test-v1.js */}
        <SlowComponent />
      </Counter>
    </div>
  );
}

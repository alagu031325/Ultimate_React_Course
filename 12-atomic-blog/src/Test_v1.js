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

export default function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount(c => c + 1)}>Increase: {count}</button>
      {/* Doesnt depend upon the state but simply being re-rendered since parent component is re-rendered - we can optimize it */}
      <SlowComponent />
    </div>
  );
}

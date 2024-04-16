import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [tipsByYou, setTipsByYou] = useState(0);
  const [tipsByFriend, setTipsByFriend] = useState(0);

  const tipPercentage = (tipsByYou + tipsByFriend) / 2;

  function handleReset() {
    setBill("");
    setTipsByYou(0);
    setTipsByFriend(0);
  }

  return (
    <div className="App">
      <BillInput bill={bill} onAddBill={setBill} />
      <SelectPercentage tips={tipsByYou} onAddTips={setTipsByYou}>
        How did you like the service?{" "}
      </SelectPercentage>
      <SelectPercentage tips={tipsByFriend} onAddTips={setTipsByFriend}>
        How did your friend/team like the service{" "}
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tipPercentage} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onAddBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        value={bill}
        onChange={e => onAddBill(Number(e.target.value))}
        placeholder="Bill value"></input>
    </div>
  );
}

function SelectPercentage({ tips, onAddTips, children }) {
  return (
    <div>
      <label>{children}</label>
      <select value={tips} onChange={e => onAddTips(Number(e.target.value))}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>You pay {`$${bill + tip} total ($${bill} bill + $${tip} tip)`}</h3>
  );
}

function Reset({ onReset }) {
  return (
    <button type="button" onClick={onReset}>
      Reset
    </button>
  );
}

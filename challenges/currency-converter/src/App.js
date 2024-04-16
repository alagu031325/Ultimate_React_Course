// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(null);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleAmountChange(e) {
    const value = Number(e.target.value);
    console.log(value);
    if (value <= 0 && value !== amount) return;
    setAmount(value);
  }

  function handleFromCurrencyChange(e) {
    const from = e.target.value;
    console.log(from);
    if (from === fromCurrency) return;
    setFromCurrency(from);
  }

  function handleToCurrencyChange(e) {
    const to = e.target.value;
    console.log(to);
    if (to === toCurrency) return;
    setToCurrency(to);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function convertCurrency() {
        try {
          setIsLoading(true);
          setError("");
          console.log(amount, toCurrency, fromCurrency);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong, Try again later");

          const data = await res.json();
          // console.log(data);
          // console.log(typeof data.rates[toCurrency]);
          setOutput(data.rates[toCurrency]);

          return function () {
            controller.abort();
          };
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (!amount || !fromCurrency || !toCurrency) return;
      if (fromCurrency === toCurrency) return setOutput(amount);
      convertCurrency();
    },
    [fromCurrency, toCurrency, amount]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={e => handleAmountChange(e)}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={e => handleFromCurrencyChange(e)}
        disabled={isLoading}>
        <option value="">Select option</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      <select
        value={toCurrency}
        onChange={e => handleToCurrencyChange(e)}
        disabled={isLoading}>
        <option value="">Select option</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      <p>{error ? error : `${output} ${toCurrency}`}</p>
    </div>
  );
}

import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(
    //This function cant have any arguments and needs to be pure function - is not executed on subsequent re-renders
    function () {
      const storedValue = localStorage.getItem(key);
      //parses the string representation back to JS object equivalent
      return storedValue ? JSON.parse(storedValue) : initialState;
    }
  );

  //This effect will only run after the movies are updated in watched array - effectively synchronized watched state with local storage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
